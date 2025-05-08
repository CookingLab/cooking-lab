import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../../redux/store';
import SavedRecipes from '../savedRecipesPage';
import { removeSavedRecipe } from '../../redux/cookingLabSlice';
import { SAVED_RECIPES_TITLE, SAVED_RECIPES_MSG, NO_SAVED_RECIPES } from '../../i18n/constants';

describe('SavedRecipes Component', () => {
  const mockStore = configureStore([]);
  const initialState: RootState = {
    cookingLab: {
      savedRecipes: {
        'Recipe 1': 'http://example.com/recipe1',
        'Recipe 2': 'http://example.com/recipe2',
      },
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
    const store = mockStore({
      cookingLab: { savedRecipes: {} },
    });

    render(
      <Provider store={store}>
        <SavedRecipes />
      </Provider>
    );

    expect(screen.getByText(NO_SAVED_RECIPES)).toBeInTheDocument();
  });

  it('calls removeSavedRecipe when the remove button is clicked', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SavedRecipes />
      </Provider>
    );

    const removeButton = screen.getAllByRole('button', { name: /Remove saved recipe/i })[0];
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(removeSavedRecipe('Recipe 1'));
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
});
