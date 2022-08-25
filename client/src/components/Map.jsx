import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

const icon = new Icon({
  iconUrl: "/poop-emoji.png",
  iconSize: [25, 25],
});

const loadMarkers = async (latLng) => {
  console.log("this is the thing", latLng);
  const url = `/nearest?lat=${latLng.lat}&lng=${latLng.lng}`;
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  console.log("is this null", data);
  return data;
};

const defaultLocation = { center: [-25.2744, 133.7751], zoom: 4 };

const Map = ({ geocodedLatLng }) => {
  const [toiletMarkers, setToiletMarkers] = useState([]);

  useEffect(() => {
    if (geocodedLatLng) {
      loadMarkers(geocodedLatLng).then((markers) =>
        setToiletMarkers(markers.closest_toilets)
      );
    }
  }, [geocodedLatLng]);

  let center = geocodedLatLng
    ? [geocodedLatLng.lat, geocodedLatLng.lng]
    : defaultLocation.center;
  let zoom = geocodedLatLng ? 14 : defaultLocation.zoom;
  console.log(geocodedLatLng);
  console.log("this is center", center);
  console.log("this is zoom", zoom);
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {toiletMarkers.map((toot) => (
        <Marker key={toot._id} position={[toot.lat, toot.lng]} icon={icon}>
          <Popup position={[toot.lat, toot.lng]}>
            <div>
              <a href={"/review/" + toot.id}>
                <h5>{toot.toilet_name}</h5>{" "}
              </a>
              <div>{toot.open_hours}</div>
              <div>
                {toot.address1}, {toot.town} {toot.state}
              </div>
              <div>{`Men: ${toot.male} Women: ${toot.female}`}</div>
              <div>{`Unisex ${toot.unisex} All Gender: ${toot.allgender}`}</div>
              <div>{`Accessible: ${toot.accessible}`}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
