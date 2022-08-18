import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import React, { useState, useEffect }  from 'react';

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

  const handleLogout = () => {
    setAuthorised(false)
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
        <NavBar handleLogout={handleLogout}/>
      </span>
      <header className="App-header">
        <Routes>

            <Route path="/" element={
              <>
                <Home />
                <Map location={location} zoomLevel={12} />
                <Register handleRegister={handleAuth} />
              </>
            }/>

            <Route path="/login" element={
              <>
                <Login handleLogin={handleAuth} />
              </>
            } />

            <Route path="/register" element={
              <>
                <Register handleRegister={handleAuth} />
              </>
            } />

        </Routes>
      </header>
    </div>
  );
}

export default App;
