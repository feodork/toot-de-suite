// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
// https://stackoverflow.com/questions/68016021/module-parse-failed-additional-babel-loader

import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"

const Map = () => {
  return (
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
        </Marker>
      </MapContainer>
  )
}

export default Map