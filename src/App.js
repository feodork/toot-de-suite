import { Routes, Route, NavLink } from 'react-router-dom'
import React, { Component }  from 'react';

import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import Home from "./components/Home";
import NavBar from './components/NavBar';
import Map from './components/Map';

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}


const App = () =>   {
  return (
    <div className="App">
      <span>
        <NavBar />
      </span>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
            <Route path="/" element={
            <>
            <Home />
            <Map location={location} zoomLevel={17} />
            </>
            }/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
