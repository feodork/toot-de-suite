import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, Component }  from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import Home from "./components/Home";
import NavBar from './components/NavBar';
import Map from './components/Map';
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'




const App = () =>   {
  const [authorised, setAuthorised] = useState(null)

  const navigate = useNavigate()

  const location = {
    address: 'Uluru',
    lat: -25.363,
    lng: 131.044,
  }
  
  const handleAuth = (authed) => {
    setAuthorised(authed)
    navigate("/")
  }
  
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch("/users/isauthorised")
      const data = await res.json()
      console.log(data.msg)
      setAuthorised(data.authorised)
    }
    checkIfLoggedIn()
  }, [])

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

            <Route path="/login" element={
              <>
                <Login handleLogin={handleAuth} />
              </>
            } />

        </Routes>
      </header>
    </div>
  );
}

export default App;
