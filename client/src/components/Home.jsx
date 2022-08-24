import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Map from "./Map";
import Search from "./Search"

const Home = () => {
  const [geocoded, setGeocoded] = useState(null);

  return (
    <>
      <div className="container home">
        <h1>Toot de Suite</h1>
        <h2>Find your closest toot</h2>
        <Search onGeocoded={(latLng) => setGeocoded(latLng)}/>
        <Map geocodedLatLng={geocoded}/>
      </div>
    </>
  )
}

export default Home
