import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'

import toiletData from "../data/toilet-data.json"
import "leaflet/dist/leaflet.css"

const Map = () => {

  return (
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {toiletData.map(toot => (
          <Marker 
          key = {toot._id}
          position={[toot.Latitude, toot.Longitude]}>

          </Marker>
        ))}

      </MapContainer>
  )
}

export default Map
