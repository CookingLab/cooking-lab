import React, { useState } from 'react';
import logo from '../img/cookingLabLogo2.png';
import Debug from './debug';
import { Navbar, Nav } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { PERSONAL_RECIPE, RECIPE_GENERATOR, SAVED_RECIPES } from '../i18n/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restartSteps } from '../utils/index';
import * as CookingLabSlice from '../redux/cookingLabSlice';

const NavBar = () => {
  const isLocalhost = window.location.hostname === 'localhost';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState('/'); // Default active link

  const handleRestart = (link: string) => {
    setActiveLink(link); // Set the active link
    restartSteps(dispatch, navigate);
    dispatch(CookingLabSlice.setTienRecipesExtended(false));
    dispatch(CookingLabSlice.setTmRecipesExtended(false));
  };

  return (
    <Navbar expand="md" className="navbar background-color">
      <Navbar.Brand>
        <a href="/">
          <img className="mx-3 logo" src={logo} alt="Cooking Lab Logo" />
        </a>
      </Navbar.Brand>
      <div className="mx-3">
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="mx-3">
          <Nav>
            <Nav.Link
              as={HashLink}
              smooth
              to="/"
              className={`navbar-link ${activeLink === '/' ? 'active' : ''}`}
              onClick={() => handleRestart('/')}
            >
              {RECIPE_GENERATOR}
            </Nav.Link>
            <Nav.Link
              data-testid="cypress-savedRecipes"
              as={HashLink}
              smooth
              to="/savedRecipes"
              className={`navbar-link ${activeLink === '/savedRecipes' ? 'active' : ''}`}
              onClick={() => handleRestart('/savedRecipes')}
            >
              {SAVED_RECIPES}
            </Nav.Link>
            <Nav.Link
              data-testid="cypress-personalRecipe"
              as={HashLink}
              smooth
              to="/personalRecipe"
              className={`navbar-link ${activeLink === '/personalRecipe' ? 'active' : ''}`}
              onClick={() => handleRestart('/personalRecipe')}
            >
              {PERSONAL_RECIPE}
            </Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
      {isLocalhost && <Debug />}
    </Navbar>
  );
};

export default NavBar;
