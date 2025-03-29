import React from 'react';
import logo from '../img/cookingLabLogo2.png';
import Debug from './debug';
import { Navbar, Nav } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { PERSONAL_RECIPE, RECIPE_GENERATOR, GENERATE_TXT } from '../i18n/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restartSteps } from '../utils/index';
import * as CookingLabSlice from '../redux/cookingLabSlice';
import { RootState } from 'redux/store';

const NavBar = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const savedRecipes = useSelector((state: RootState) => state.cookingLab.savedRecipes);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleRestart = () => {
    restartSteps(dispatch, navigate);
    dispatch(CookingLabSlice.setTienRecipesExtended(false));
    dispatch(CookingLabSlice.setTmRecipesExtended(false));
  }

  const handleGenerateTxtFile = () => {
    // TODO
    console.log('Generating text file');
  }

  return (
    <Navbar expand="md" className="navbar background-color">
      <Navbar.Brand>
        <a href="/">
          <img className="mx-3 logo" src={logo} alt="Cooking Lab Logo"/>
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
              className="navbar-link"
              onClick={() => handleRestart()}
            >
              {RECIPE_GENERATOR}
            </Nav.Link>
            <Nav.Link 
              data-testid="cypress-personalRecipe"
              as={HashLink} 
              smooth 
              to="/personalRecipe" 
              className="navbar-link"
              onClick={() => handleRestart()}
            >
              {PERSONAL_RECIPE}
            </Nav.Link>
            <button data-testid="save-recipe-btn" className="btn btn-dark cooking-lab-btn me-3 ms-3" onClick={() => handleGenerateTxtFile()}>
              {`${GENERATE_TXT}(${Object.keys(savedRecipes).length})`}
            </button>
          </Nav>
        </div>
      </Navbar.Collapse>
      {isLocalhost && <Debug />}
    </Navbar>
  )
}

export default NavBar;
