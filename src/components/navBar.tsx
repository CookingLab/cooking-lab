import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from '../img/cookingLabLogo2.png';
import Debug from './debug';
import { Navbar, Nav } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { PERSONAL_RECIPE, RECIPE_GENERATOR, GENERATE_TXT, MODAL_TITLE, MODAL_TEXT, SAVED_RECIPES } from '../i18n/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restartSteps } from '../utils/index';
import * as CookingLabSlice from '../redux/cookingLabSlice';
import { RootState } from 'redux/store';
import CustomModal from './modal';

const NavBar = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const savedRecipes = useSelector((state: RootState) => state.cookingLab.savedRecipes || {});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const handleRestart = () => {
    restartSteps(dispatch, navigate);
    dispatch(CookingLabSlice.setTienRecipesExtended(false));
    dispatch(CookingLabSlice.setTmRecipesExtended(false));
  }
  

  const handleGeneratePdfFile = () => {
  
    const recipes = Object.entries(savedRecipes);
    if (recipes.length === 0) {
      handleShow();
      setShowModal(true);
      return;
    }
  
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text('CookingLab Recipes', 105, 20, { align: 'center' });
  
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(logo, 'PNG', 80, 30, imgWidth, imgHeight);
  
    doc.setFontSize(14);
    doc.text('Here are your saved recipes, click on the recipe name to view it:', 105, 90, { align: 'center' });
    
    doc.setFontSize(12);
    let yPosition = 100;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - margin * 2;

    recipes.forEach(([name, url], index) => {
      const text = `${index + 1}. ${name}`;
      
      // Render the recipe name (split into multiple lines if necessary)
      const splitText = doc.splitTextToSize(text, maxWidth);
      splitText.forEach((line: string, lineIndex: number) => {
        doc.textWithLink(line, margin, yPosition, { url });
    
        // Only draw the underline starting after the number (index + 1) on the first line
        if (lineIndex === 0) {
          const numberWidth = doc.getTextWidth(`${index + 1}. `); // Calculate the width of the number
          const textWidth = doc.getTextWidth(line) - numberWidth; // Calculate the width of the remaining text
          doc.line(margin + numberWidth, yPosition + 1, margin + numberWidth + textWidth, yPosition + 1); // Draw underline only for the text
        } else {
          const textWidth = doc.getTextWidth(line); // For subsequent lines, underline the entire line
          doc.line(margin, yPosition + 1, margin + textWidth, yPosition + 1);
        }
    
        yPosition += 10;
    
        // Handle page overflow
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
      });
    });

    doc.setFontSize(10);
    doc.text('Thank you for using CookingLab!', 105, 280, { align: 'center' });
    doc.text('Visit us at: https://cooking-lab.netlify.app/', 105, 290, { align: 'center' });
  
    doc.save('cooking_lab_recipes.pdf');
  };

  return (
    <>
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
              <Nav.Link
                data-testid="cypress-savedRecipes"
                as={HashLink}
                smooth
                to="/savedRecipes"
                className="navbar-link"
                onClick={() => handleRestart()}
              >
                {SAVED_RECIPES}
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
        {isLocalhost && <Debug />}
        <div className="position-relative">
          <button data-testid="save-recipe-btn" className="btn btn-dark cooking-lab-btn me-3 ms-3" onClick={() => handleGeneratePdfFile()}>
            {GENERATE_TXT}
          </button>
          <span className="badge">{Object.keys(savedRecipes).length}</span>
        </div>
      </Navbar>
      <CustomModal
        modalTitle={MODAL_TITLE}
        modalText={MODAL_TEXT}
        show={showModal}
        handleClose={handleClose}
      />
    </>
  )
}

export default NavBar;
