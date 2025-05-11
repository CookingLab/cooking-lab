import React, {useState} from 'react';
import jsPDF from 'jspdf';
import logo from '../img/cookingLabLogo2.png';
import { SAVED_RECIPES_TITLE, SAVED_RECIPES_MSG, NO_SAVED_RECIPES, GENERATE_TXT, MODAL_TITLE, MODAL_TEXT } from '../i18n/constants';
import CustomModal from './modal';

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
    <div className="App">
      <div className="container mt-5" data-aos="fade-right">
        <div className="card shadow mb-5">
          <div className="card-body card-body-bg">
            <h1 className="text-center">
              <strong>{SAVED_RECIPES_TITLE}</strong>
            </h1>
            {!isSavedRecipesEmpty && (
              <p className="text-center">{SAVED_RECIPES_MSG}</p>
            )}
            <div className="container">
              {isSavedRecipesEmpty ? (
                <p className="text-center">{NO_SAVED_RECIPES}</p>
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
                      >
                        <i className="bi bi-trash-fill" aria-hidden="true"></i>
                      </button>
                    </li>
                    ))}
                </ul>
              )}
              <div className="position-relative">
                <button data-testid="save-recipe-btn" className="btn btn-dark cooking-lab-btn me-3 ms-3 mt-3" onClick={() => handleGeneratePdfFile()}>
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
