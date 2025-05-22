import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from '../img/cookingLabLogo2.png';
import { SAVED_RECIPES_TITLE, SAVED_RECIPES_MSG, NO_SAVED_RECIPES, GENERATE_TXT, MODAL_TITLE, MODAL_TEXT } from '../i18n/constants';
import CustomModal from './modal';
import {handleGeneratePdfFile} from '../utils/index';


const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Record<string, string>>(() => {
    return JSON.parse(localStorage.getItem('savedRecipes') || '{}');
  });
  const isSavedRecipesEmpty = Object.entries(savedRecipes).length === 0;

  const handleRemoveSavedRecipe = (name: string) => {
    const updatedRecipes = { ...savedRecipes };
    delete updatedRecipes[name];
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    setSavedRecipes(updatedRecipes);
  };

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const generatePdf = () => {
    const recipes = Object.entries(savedRecipes);
    if (recipes.length === 0) {
      handleShow();
      setShowModal(true);
      return;
    }
    handleGeneratePdfFile(savedRecipes);
  }

  return (
    <div className="App">
      <div className="container mt-5" data-aos="fade-right">
        <div className="card shadow mb-5">
          <div className="card-body card-body-bg">
            <h1 className="text-center" data-testid="saved-recipes-title">
              <strong>{SAVED_RECIPES_TITLE}</strong>
            </h1>
            {!isSavedRecipesEmpty && (
              <p className="text-center">{SAVED_RECIPES_MSG}</p>
            )}
            <div className="container">
              {isSavedRecipesEmpty ? (
                <p className="text-center" data-testid="no-saved-recipes">{NO_SAVED_RECIPES}</p>
              ) : (
                <ul className="list-group">
                  {Object.entries(savedRecipes).map(([name, url]) => (
                    <li key={name} className="list-group-item">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {name}
                      </a>
                      <button
                        onClick={() => handleRemoveSavedRecipe(name)}
                        className="btn p-0 float-end"
                        style={{ fontSize: '1.5rem' }}
                        aria-label="Remove saved recipe"
                        data-testid="remove-saved-recipe-btn"
                      >
                        <i className="bi bi-trash-fill" aria-hidden="true"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="position-relative">
                <button
                  data-testid="save-recipe-btn"
                  className="btn btn-dark cooking-lab-btn me-3 ms-3 mt-3"
                  onClick={() => generatePdf()}
                >
                  {GENERATE_TXT}
                </button>
              </div>
            </div>
            <CustomModal
              modalTitle={MODAL_TITLE}
              modalText={MODAL_TEXT}
              show={showModal}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
