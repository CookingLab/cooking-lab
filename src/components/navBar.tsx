import React from 'react';
import logo from '../img/cookingLabLogo2.png';
import Debug from './debug';

const NavBar = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  return (
    <nav className="navbar navbar-light background-color">
      <img className="mx-3 logo" src={logo} alt="Cooking Lab Logo"/>
      {isLocalhost && <Debug />}
    </nav>
  )
}

export default NavBar;
