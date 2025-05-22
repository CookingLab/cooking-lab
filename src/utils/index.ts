import {
  setQuickRecipe,
  setEditing,
  clearCuisine,
  clearMealType,
  clearMeat,
  clearDiets,
  clearHealths,
} from '../redux/cookingLabSlice';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../img/cookingLabLogo2.png';

export const formatInputValue = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const restartSteps = (dispatch: Dispatch, navigate: ReturnType<typeof useNavigate>) => {
  dispatch(setQuickRecipe(false));
  dispatch(setEditing(false));
  dispatch(clearCuisine());
  dispatch(clearMealType());
  dispatch(clearMeat());
  dispatch(clearDiets());
  dispatch(clearHealths());
  navigate('/');
};

export const handleGeneratePdfFile = (savedRecipes: Record<string, string>) => {
  const recipes = Object.entries(savedRecipes);

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
