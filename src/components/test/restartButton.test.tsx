import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RestartButton from '../restartButton';
import { RESTART } from '../../i18n/constants';
import { clearCuisine, clearMealType, clearDiets, clearHealths, setEditing } from '../../redux/cookingLabSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('Restart Button component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: '',
        selectedMealType: '',
        selectedDiets: [],
        selectedHealths: [],
        isEditing: false,
      },
    });
  });

  it('should renders Step1 component', () => {
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
    const actions = (store as any).getActions();
    expect(actions).toEqual([setEditing(false), clearCuisine(), clearMealType(), clearDiets(), clearHealths()]);
  });
});
