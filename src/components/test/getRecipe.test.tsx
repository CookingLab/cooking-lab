/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import GetRecipe from '../getRecipe';
import { RecipeProps } from '../../interfaces/recipeInterface';

jest.mock('axios');
const mockStore = configureStore([]);

describe('GetRecipe Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: 'Italian',
        selectedMealType: 'Dinner',
        selectedDiet: ['Vegetarian'],
        selectedHealth: ['Peanut-Free'],
        backEndEndpoint: 'prod',
      },
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GetRecipe />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should call getRecipes on mount and handles API response', async () => {
    const mockRecipe: RecipeProps = {
      label: 'Test Recipe',
      image: 'test-image.jpg',
      ingredients: [{ text: 'ingredient1' }],
      url: 'http://test-url.com',
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRecipe });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <GetRecipe />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    });
  });

  it('should set targetEndpoint to production URL when endpoint is prod', async () => {
    const mockRecipe: RecipeProps = {
      label: 'Test Recipe',
      image: 'test-image.jpg',
      ingredients: [{ text: 'ingredient1' }],
      url: 'http://test-url.com',
    };
  
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRecipe });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GetRecipe />
        </BrowserRouter>
      </Provider>
    );
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://cooking-lab-api.onrender.com/api/recipes?cuisineType=Italian&mealType=Dinner&diet=Vegetarian&health=Peanut-Free'
      );
    });
  });
  
  it('should set targetEndpoint to localhost URL when endpoint is not prod', async () => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: 'Italian',
        selectedMealType: 'Dinner',
        selectedMeat: 'Chicken',
        selectedDiet: ['Vegetarian'],
        selectedHealth: ['Peanut-Free'],
        backEndEndpoint: 'dev',
      },
    });
  
    const mockRecipe: RecipeProps = {
      label: 'Test Recipe',
      image: 'test-image.jpg',
      ingredients: [{ text: 'ingredient1' }],
      url: 'http://test-url.com',
    };
  
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRecipe });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GetRecipe />
        </BrowserRouter>
      </Provider>
    );
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/api/recipes?cuisineType=Italian&mealType=Dinner&diet=Vegetarian&health=Peanut-Free&meat=Chicken'
      );
    });
  });

});
