/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RECIPE_LOADER,
  RECIPE_ERROR_TITLE,
  RECIPE_ERROR_MESSAGE,
  RECIPE_ERROR_SUB_MESSAGE,
} from '../i18n/constants'
import React from 'react';
import PersonalRecipePage from '../components/personalRecipePage';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('PersonalRecipePage component', () => {
        
  render(
    <Router>
      <PersonalRecipePage title="Tiramisu" ingredients={[]} instructions={[]} imageURL="" id={0} />
    </Router>
  );
  
  it('should have take back to /personalRecipe when clicked on back button', () => {
      
    const backIcon = screen.getByTestId('back-icon');
    fireEvent.click(backIcon);
    expect(window.location.pathname).toBe('/personalRecipe');
  });
  
  it('should have generate error msg', () => {
          
    render(
      <Router>
        <PersonalRecipePage title="Error" ingredients={[]} instructions={[]} imageURL="" id={0} />
      </Router>
    );
      
    const backIcon = screen.getByTestId('error-back-icon');
    fireEvent.click(backIcon);
    expect(window.location.pathname).toBe('/personalRecipe');
  });
    
  it('should see loading msg when timeout exceed 10s', () => {
    jest.useFakeTimers();
        
    render(
      <Router>
        <PersonalRecipePage title="" ingredients={[]} instructions={[]} imageURL="" id={0} />
      </Router>
    );
      
    jest.advanceTimersByTime(11000);
    expect(screen.getByText(RECIPE_LOADER)).toBeInTheDocument();
  });
      
  it('should display error message when label is "Error"', () => {
    render(
      <Router>
        <PersonalRecipePage title="Error" ingredients={[]} instructions={[]} imageURL="" id={0} />
      </Router>
    );
      
    expect(screen.getByText(RECIPE_ERROR_TITLE)).toBeInTheDocument();
    expect(screen.getByText(RECIPE_ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(RECIPE_ERROR_SUB_MESSAGE)).toBeInTheDocument();
  });
      
  it('should display recipe details when title is provided', () => {
    const title = 'Test Recipe';
    const ingredients = ['Ingredient 1' , 'Ingredient 2' ];
    const instructions = ['Instruction 1', 'Instruction 2'];
    const url = 'http://test.com';
      
    render(
      <Router>
        <PersonalRecipePage title={title} ingredients={ingredients} instructions={instructions} imageURL={url} id={0} />
      </Router>
    );
      
    expect(screen.getByTestId('recipe-title').textContent).toBe(title);
    expect(screen.getByTestId('recipe-ingredient')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-ingredient-list').children).toHaveLength(ingredients.length);
    expect(screen.getByTestId('recipe-instructions')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-instructions-list').children).toHaveLength(instructions.length);
  });
});