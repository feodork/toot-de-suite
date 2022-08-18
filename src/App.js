import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import React, { Component }  from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import Home from "./components/Home";
import NavBar from './components/NavBar';
import Map from './components/Map';

const location = {
  address: 'Uluru',
  lat: -25.363,
  lng: 131.044,
}


const App = () =>   {

  const navigate = useNavigate()

  return (
    <div className="App">
      <span>
        <NavBar />
      </span>
      <header className="App-header">
        <Routes>
            <Route path="/" element={
            <>
            <Home />
            <Map location={location} zoomLevel={12} />
            </>
            }/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
