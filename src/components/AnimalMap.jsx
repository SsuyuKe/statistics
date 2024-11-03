import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import Iguana from '@/assets/images/iguana.png'

// 模擬地圖資料，包括中心點和標記
const mapData = {
  center: [25.033, 121.5654], // 中心點座標，例如台北
  locations: [
    { id: 1, coords: [25.033, 121.5654], popup: '台北市中心' },
    { id: 2, coords: [25.0375, 121.5637], popup: '台北 101' }
  ]
}

const OSMUrl_light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// const CartoDBUrl_dark = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
const OSMAttribute =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const IguanaIcon = L.icon({
  iconUrl: Iguana,
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60]
})

L.Marker.prototype.options.icon = IguanaIcon

const AnimalMap = () => {
  return (
    <MapContainer
      center={mapData.center}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url={OSMUrl_light} attribution={OSMAttribute} />
      {mapData.locations.map((location) => (
        <Marker key={location.id} position={location.coords}>
          <Popup>{location.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default AnimalMap
