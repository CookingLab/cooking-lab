import {
    RECIPE_INGREDIENT,
    RECIPE_LINK,
    RECIPE_LOADER,
    RECIPE_ERROR_TITLE,
    RECIPE_ERROR_MESSAGE,
    RECIPE_ERROR_SUB_MESSAGE,
    FIRST_RECIPE_DELAY_MESSAGE,
    SORRY_MSG,
    RESTART
} from '../../i18n/constants';
import React from 'react';
import RecipePage from '../recipePage';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('RecipePage component', () => {
    beforeEach(() => {
        store = mockStore({
          cookingLab: {
            selectedDiet: [],
            isEditing: false,
          },
        });
        
        render(
          <Provider store={store}>
            <Router>
              <RecipePage label={''} image={''} ingredients={[]} url={''} />
            </Router>
          </Provider>
        );
      });

      it('should renders RecipePage component loader', () => {
        expect(screen.getByText(RESTART)).toBeInTheDocument();
        expect(screen.getByText(RECIPE_LOADER)).toBeInTheDocument();
      });
      
      it('should display error message when label is "Error"', () => {
        render(
          <Provider store={store}>
          <Router>
            <RecipePage label={'Error'} image={''} ingredients={[]} url={''} />
          </Router>
          </Provider>
        );
      
        expect(screen.getByText(RECIPE_ERROR_TITLE)).toBeInTheDocument();
        expect(screen.getByText(RECIPE_ERROR_MESSAGE)).toBeInTheDocument();
        expect(screen.getByText(RECIPE_ERROR_SUB_MESSAGE)).toBeInTheDocument();
      });
      
      it('should display recipe details when label is provided', () => {
        const label = 'Test Recipe';
        const ingredients = [{ text: 'Ingredient 1' }, { text: 'Ingredient 2' }];
        const url = 'http://test.com';
        const image = 'test.jpg';
      
        render(
          <Provider store={store}>
          <Router>
            <RecipePage label={label} image={image} ingredients={ingredients} url={url} />
          </Router>
          </Provider>
        );
      
        expect(screen.getByTestId('recipe-label').textContent).toBe(label);
        expect(screen.getByTestId('recipe-ingredient')).toBeInTheDocument();
        expect(screen.getByTestId('recipe-ingredient-list').children).toHaveLength(ingredients.length);
        expect(screen.getByTestId('recipe-link')).toBeInTheDocument();
        expect(screen.getByText(url)).toBeInTheDocument();
      });
});
