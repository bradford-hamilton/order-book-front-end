import React from 'react';
import { NavItem, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">MasterBook</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

export default NavBar;
