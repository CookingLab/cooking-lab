import React from 'react';
import logo from '../img/cookingLabLogo2.png';


const NavBar = () => {
  return (
    <nav className="navbar navbar-light">
      <a className="navbar-brand" href="#">
        <img className="mx-3 logo" src={logo} alt="Cooking Lab Logo"/>
      </a>
    </nav>
  )
}

export default NavBar;