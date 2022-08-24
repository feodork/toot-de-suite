import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import CreateReview from "./components/CreateReview";
// import ShowReview from "./components/ShowReview";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('/is-authenticated')
      const data = await res.json()
      setUser(data.user)
    }
    if (!user) checkLoggedIn()
  }, [])

  const handleLogout = async () => {
    const res = await fetch('/logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) setUser(null)
  }
  
  return (
    <div className="App">
      <span>
        <NavBar handleLogout={handleLogout} />
      </span>
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Register  />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Register  />
              </>
            }
          />
          <Route
            path="/review/:toot_id/"
            element={
              <>
                {/* show all reviews */}
              </>
            }
          />
          <Route
            path="/review/:toot_id/new"
            element={
              <>
                <CreateReview />
              </>
            }
          />
        </Routes>
      </header>
    </div>
  );
};

export default App;
