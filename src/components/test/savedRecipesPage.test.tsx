import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../../redux/store';
import SavedRecipes from '../savedRecipesPage';
import { SAVED_RECIPES_TITLE, SAVED_RECIPES_MSG, NO_SAVED_RECIPES, GENERATE_TXT, MODAL_TITLE, MODAL_TEXT } from '../../i18n/constants';

describe('SavedRecipes Component', () => {
  const mockStore = configureStore([]);
  const initialState: RootState = {
    cookingLab: {
      isQuickRecipe: false,
      isEditing: false,
      selectedCuisine: '',
      selectedMealType: '',
      selectedDiet: [],
      selectedHealth: [],
      selectedMeat: '',
      backEndEndpoint: 'prod',
      recipeGenerate: 0,
      isTienRecipesExpanded: false,
      isTmRecipesExpanded: false,
    },
  };

  beforeEach(() => {
    // Set up recipes in localStorage before each test
    const savedRecipes = {
      'Recipe 1': 'http://example.com/recipe1',
      'Recipe 2': 'http://example.com/recipe2',
    };
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  it('renders the title and message when there are saved recipes', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SavedRecipes />
      </Provider>
    );

    expect(screen.getByText(SAVED_RECIPES_TITLE)).toBeInTheDocument();
    expect(screen.getByText(SAVED_RECIPES_MSG)).toBeInTheDocument();
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
  });

  it('renders a message when there are no saved recipes', () => {
    const store = mockStore(initialState);
    localStorage.clear(); // Clear saved recipes

    render(
      <Provider store={store}>
        <SavedRecipes />
      </Provider>
    );

    expect(screen.getByText(SAVED_RECIPES_TITLE)).toBeInTheDocument();
    expect(screen.getByText(NO_SAVED_RECIPES)).toBeInTheDocument();
  });

  it('renders links with correct href attributes for saved recipes', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SavedRecipes />
      </Provider>
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'http://example.com/recipe1');
    expect(links[1]).toHaveAttribute('href', 'http://example.com/recipe2');
  });

  it('removes a saved recipe when the delete button is clicked', () => {
    render(<SavedRecipes />);

    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();

    const deleteButton = screen.getAllByRole('button', { name: 'Remove saved recipe' })[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Recipe 1')).not.toBeInTheDocument();
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();

    const updatedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '{}');
    expect(updatedRecipes).toEqual({ 'Recipe 2': 'http://example.com/recipe2' });
  });

  it('opens the modal when generating a PDF with no saved recipes', () => {
    localStorage.clear();
    render(<SavedRecipes />);

    const generatePdfButton = screen.getByText(GENERATE_TXT);
    fireEvent.click(generatePdfButton);

    expect(screen.getByText(MODAL_TITLE)).toBeInTheDocument();
    expect(screen.getByText(MODAL_TEXT)).toBeInTheDocument();
  });

  it('renders links with correct href attributes for saved recipes', () => {
    render(<SavedRecipes />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'http://example.com/recipe1');
    expect(links[1]).toHaveAttribute('href', 'http://example.com/recipe2');
  });

});