import { Link, useParams } from 'react-router-dom'
import React, { useEffect, Component } from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar className="colour-nav">
            <container>
                <Navbar.Brand><img className="nav-img" src="/poop-emoji.png" />Toot de Suite</Navbar.Brand>
                <Nav className="me-auto" />

                <p>home</p>
                <p>login</p>
                <p>logout</p>
                <p>register</p>
            </container>
        </Navbar>
    )
}

export default NavBar