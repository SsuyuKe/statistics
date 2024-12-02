import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import ToggleButton from '@/components/ToggleButton'
import MapSelect from '@/components/MapSelect'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapIcon from '@/components/MapIcon'
import TimelineWithSlider from '@/components/TimeLine'
import SvgIcon from '@/components/SvgIcon'
import clsx from 'clsx'
import { iguanaCategories } from '@/assets/js/constant.js'

const OSMUrl_light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const CartoDBUrl_dark =
  'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
const OSMAttribute =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const toggleMapModeOptions = [
  { label: '亮模式', value: 'lightMode' },
  { label: '暗模式', value: 'darkMode' }
]
const calculateGrade = (amount) => {
  const grade = Math.ceil(amount / 10)
  return grade > 10 ? 10 : grade
}

const createIcon = (image, grade, colorType) => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(
      <MapIcon image={image} grade={grade} colorType={colorType} />
    )
  })
}
// 計算兩個地點的距離（經緯度計算）
const calculateDistance = (coords1, coords2) => {
  const [lat1, lng1] = coords1
  const [lat2, lng2] = coords2
  const R = 6371 // 地球半徑，單位：公里
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
// 合併地點
const mergeLocations = (locations, zoomLevel) => {
  const threshold =
    zoomLevel < 5 // 合併距離閾值 threshold(km)
      ? 50
      : zoomLevel < 7
        ? 20
        : zoomLevel < 9
          ? 10
          : zoomLevel < 11
            ? 5
            : zoomLevel < 13
              ? 2
              : zoomLevel < 15
                ? 1
                : 0.5
  console.log(`當前縮放級別: ${zoomLevel}, 閾值: ${threshold}`)
  const merged = []
  const visited = new Set()

  locations.forEach((loc, i) => {
    if (visited.has(i)) return
    let combined = { ...loc }
    visited.add(i)

    locations.forEach((otherLoc, j) => {
      if (i !== j && !visited.has(j)) {
        const distance = calculateDistance(loc.coords, otherLoc.coords)
        if (distance <= threshold) {
          combined = {
            ...combined,
            coords: [
              (combined.coords[0] + otherLoc.coords[0]) / 2,
              (combined.coords[1] + otherLoc.coords[1]) / 2
            ], // 更新合併後的中心座標
            totalAmount: combined.totalAmount + otherLoc.totalAmount,
            maleLarge: combined.maleLarge + otherLoc.maleLarge,
            femaleLarge: combined.femaleLarge + otherLoc.femaleLarge,
            maleMedium: combined.maleMedium + otherLoc.maleMedium,
            femaleMedium: combined.femaleMedium + otherLoc.femaleMedium,
            juvenile: combined.juvenile + otherLoc.juvenile,
            location: `${combined.location}, ${otherLoc.location}` // 合併標題
          }
          visited.add(j)
        }
      }
    })
    combined.id = `merged-${i}`
    merged.push(combined)
  })

  return merged
}

// 使用 react-leaflet 的 useMap Hook 監聽地圖事件
const MapEventHandler = ({ locations, onLocationsUpdate }) => {
  const map = useMap()
  useEffect(() => {
    let debounceTimer
    const handleZoomEnd = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        const zoomLevel = map.getZoom()
        const mergedData = mergeLocations(locations, zoomLevel)
        onLocationsUpdate(mergedData)
      }, 300) // Add debounce delay
    }
    map.on('zoomend', handleZoomEnd)
    const initialMergedData = mergeLocations(locations, map.getZoom())
    onLocationsUpdate(initialMergedData)
    return () => {
      map.off('zoomend', handleZoomEnd)
      clearTimeout(debounceTimer)
    }
  }, [])
  return null
}
MapEventHandler.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      location: PropTypes.string.isRequired,
      iconUrl: PropTypes.string.isRequired,
      totalAmount: PropTypes.number.isRequired,
      maleLarge: PropTypes.number.isRequired,
      femaleLarge: PropTypes.number.isRequired,
      maleMedium: PropTypes.number.isRequired,
      femaleMedium: PropTypes.number.isRequired,
      juvenile: PropTypes.number.isRequired
    })
  ).isRequired,
  onLocationsUpdate: PropTypes.func.isRequired
}

const AnimalMap = ({ className, colorType, options, onMonthChange, data }) => {
  const [url, setUrl] = useState(OSMUrl_light)
  const [mode, setMode] = useState(false)
  const [mergedLocations, setMergedLocations] = useState(data.locations)

  const handleToggleMapModeChange = (e) => {
    setUrl(e.target.value === 'darkMode' ? CartoDBUrl_dark : OSMUrl_light)
    setMode(e.target.value === 'darkMode')
  }
  if (!data.locations?.length && !data.center) {
    return null
  }
  return (
    <div className={clsx({ 'popup-dark': mode }, className)}>
      <div className="mb-4 flex justify-end">
        <ToggleButton
          options={toggleMapModeOptions}
          onChange={handleToggleMapModeChange}
        />
      </div>
      <div className="relative h-[400px] rounded-[10px] overflow-hidden">
        <MapSelect
          className="absolute right-9 top-6 w-[182px] z-[1000]"
          onChange={onMonthChange}
          options={options}
          darkMode={mode}
        />
        <TimelineWithSlider
          className="absolute left-4 bottom-7 z-[1000]"
          darkMode={mode}
        />
        <MapContainer
          center={data.center}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer url={url} attribution={OSMAttribute} />
          <MapEventHandler
            locations={data.locations}
            onLocationsUpdate={setMergedLocations}
          />
          {mergedLocations?.map((location) => (
            <Marker
              key={location.id}
              position={location.coords}
              icon={createIcon(
                location.iconUrl,
                calculateGrade(location.totalAmount),
                colorType
              )}
            >
              <Popup>
                <h3
                  className={clsx(
                    'text-[#FC6767] flex items-center border-b border-solid pb-2 font-bold',
                    `${mode ? 'border-[#7C7C7C]' : 'border-[#E0E0E0]'}`
                  )}
                >
                  <SvgIcon
                    className="mr-2"
                    name="location-red"
                    width={12}
                    color="#FC6767"
                  />
                  {location.location}
                </h3>
                <div
                  className={clsx(
                    'border-b border-solid py-2 flex justify-between',
                    `${mode ? 'border-[#7C7C7C]' : 'border-[#E0E0E0]'}`
                  )}
                >
                  <p
                    className={clsx('flex !m-0 font-bold', {
                      'text-white': mode
                    })}
                  >
                    <SvgIcon
                      width={14}
                      height={14}
                      className="mr-2"
                      name={`${mode ? 'circles-three-plus' : 'circles-three-plus-dark'}`}
                      color="#1C1C1C"
                    />
                    總數
                  </p>
                  <p className={clsx('!m-0', { 'text-white': mode })}>
                    {location.totalAmount}
                  </p>
                </div>
                <ul className="pt-2">
                  {iguanaCategories.map((item) => (
                    <li
                      key={item.label}
                      className={clsx('flex justify-between mb-2 last:mb-0', {
                        'text-white': mode
                      })}
                    >
                      <div className="flex font-bold">
                        <SvgIcon
                          width={14}
                          height={14}
                          className="mr-2"
                          name={item.icon}
                          color="#1C1C1C"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span>{location[item.category]}</span>
                    </li>
                  ))}
                </ul>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default AnimalMap

AnimalMap.propTypes = {
  className: PropTypes.string,
  colorType: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  ).isRequired,
  onMonthChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number).isRequired, // 中心地點 [lat, lng]
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        coords: PropTypes.arrayOf(PropTypes.number).isRequired, // 經緯度 [lat, lng]
        location: PropTypes.string.isRequired,
        iconUrl: PropTypes.string.isRequired,
        totalAmount: PropTypes.number.isRequired,
        maleLarge: PropTypes.number.isRequired,
        femaleLarge: PropTypes.number.isRequired,
        maleMedium: PropTypes.number.isRequired,
        femaleMedium: PropTypes.number.isRequired,
        juvenile: PropTypes.number.isRequired
      })
    ).isRequired // 地點的陣列
  }).isRequired // mapData 整體
}
