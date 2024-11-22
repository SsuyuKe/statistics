import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import ToggleButton from '@/components/ToggleButton'
import MapSelect from '@/components/MapSelect'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Iguana from '@/assets/images/iguana.png'
import MapIcon from '@/components/MapIcon'
import TimelineWithSlider from '@/components/TimeLine'
import SvgIcon from '@/components/SvgIcon'
import clsx from 'clsx'

// mock地圖資料
const mapData = {
  center: [25.033, 121.5654],
  locations: [
    {
      id: 1,
      coords: [25.033, 121.5337],
      popup: '台北市中心',
      iconUrl: Iguana,
      grade: 1,
      amount: 3
    },
    {
      id: 2,
      coords: [25.0375, 121.5555],
      popup: '台北 101',
      iconUrl: Iguana,
      grade: 2,
      amount: 56
    },
    {
      id: 3,
      coords: [25.0375, 121.5784],
      popup: '微風廣場',
      iconUrl: Iguana,
      grade: 3,
      amount: 100
    }
  ]
}
const categories = [
  {
    label: '公-30cm以上',
    value: 30,
    icon: 'iguana'
  },
  {
    label: '公-30cm以上',
    value: 30,
    icon: 'iguana-purple'
  },
  {
    label: '母-30cm以上',
    value: 30,
    icon: 'iguana-orange'
  },
  {
    label: '母-19-29cm',
    value: 30,
    icon: 'iguana-red'
  },
  {
    label: '幼蜥',
    value: 30,
    icon: 'iguana-blue'
  }
]
const OSMUrl_light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const CartoDBUrl_dark =
  'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
const OSMAttribute =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const toggleMapModeOptions = [
  { label: '亮模式', value: 'lightMode' },
  { label: '暗模式', value: 'darkMode' }
]

const createIcon = (image, grade, number, colorType) => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(
      <MapIcon
        image={image}
        grade={grade}
        number={number}
        colorType={colorType}
      />
    )
  })
}

const AnimalMap = ({ className, colorType, options, onMonthChange }) => {
  const [url, setUrl] = useState(OSMUrl_light)
  const [mode, setMode] = useState(false)

  const handleToggleMapModeChange = (e) => {
    setUrl(e.target.value === 'darkMode' ? CartoDBUrl_dark : OSMUrl_light)
    setMode(e.target.value === 'darkMode')
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
          center={mapData.center}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer url={url} attribution={OSMAttribute} />
          {mapData.locations.map((location) => (
            <Marker
              key={location.id}
              position={location.coords}
              icon={createIcon(
                location.iconUrl,
                location.grade,
                location.amount,
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
                  輔英科技大學
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
                    {categories.reduce(
                      (prev, category) => prev + category.value,
                      0
                    )}
                  </p>
                </div>
                <ul className="pt-2">
                  {categories.map((item) => (
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
                      <span>{item.value}</span>
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
  onMonthChange: PropTypes.func.isRequired
}
