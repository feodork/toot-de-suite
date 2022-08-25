import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = ({ handleLogout }) => {
  return (
    <Navbar expand="lg" className="colour-nav">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="poop emoji logo"
            className="d-inline-block nav-img"
            src="/poop-emoji.png"
          />{" "}
          Toot de Suite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
