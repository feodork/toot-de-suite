import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import CreateReview from "./components/CreateReview";
import ShowReviews from "./components/ShowReviews";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";


const App = () => {
  const [user, setUser] = useState(null)
  console.log({user})

  let navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('/is-authenticated')
      const data = await res.json()
      setUser(data.user)
    }
    if (!user) checkLoggedIn()
  }, [])

  // const userAuthed = (user) => {
  //   if (user == null) {return false}
  //   else {return true}
  // }
  // console.log(userAuthed, "this is the new thing")

  const handleLogin = (user) => {
    setUser(user)
    navigate("/")
  }

  const handleLogout = async () => {
    const res = await fetch('/logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) setUser(null)
    navigate("/")
  }
  
  return (
    <div className="App">
      <span>
        <NavBar handleLogout={handleLogout} user={user}/>
      </span>
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login handleLogin={handleLogin}/>
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
                <ShowReviews user={user}/>
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
