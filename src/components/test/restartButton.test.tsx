import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RestartButton from '../restartButton';
import { RESTART } from '../../i18n/constants';
import { clearCuisine, clearMealType, clearMeat, clearDiets, clearHealths, setEditing, setQuickRecipe } from '../../redux/cookingLabSlice';

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

describe('Restart Button component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: '',
        selectedMealType: '',
        selectedMeat: '',
        selectedDiets: [],
        selectedHealths: [],
        isEditing: false,
        isQuickRecipe: false,
      },
    });
  });

  it('should render RestartButton component', () => {
    render(
      <Provider store={store}>
        <Router>
          <RestartButton />
        </Router>
      </Provider>
    );

    expect(screen.getByText(RESTART)).toBeInTheDocument();
  });

  it('should clear all values on click', () => {
    render(
      <Provider store={store}>
        <Router>
          <RestartButton />
        </Router>
      </Provider>
    );

    const restart = screen.getByText(RESTART);
    fireEvent.click(restart);
    const actions = store.getActions();
    expect(actions).toEqual([setQuickRecipe(false), setEditing(false), clearCuisine(), clearMealType(), clearMeat(), clearDiets(), clearHealths()]);
  });
});
