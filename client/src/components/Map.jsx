import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import toiletData from "../data/toilet-data.json"
import "leaflet/dist/leaflet.css"

const Map = () => {

const filteredToilets = toiletData.filter(toots => toots.State === "NT")

  return (
      <MapContainer center={[-12.4637, 130.8444]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredToilets.map(toot => (
          <Marker 
          key={toot._id}
          position={[toot.Latitude, toot.Longitude]}>
            <Popup position={[toot.Latitude, toot.Longitude]}>
              <div>
                <h3>{toot.Name}</h3>
                <p>{toot.Address1}, {toot.Town} {toot.State}</p>
                <p>Men: {toot.Male} Women: {toot.Female} Unisex {toot.Unisex} All Gender: {toot.AllGender}</p>
                <p>Accessible: {toot.Accessible}</p>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
  )
}

export default Map
