import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Step1 from '../step1';
import { STEP1_TITLE, STEP1_DESCRIPTION, STEP1_CUISINES, STEP1_RANDOM, RESTART } from '../../i18n/constants';
import { setCuisine } from '../../redux/cookingLabSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('Step1 component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: '',
        isEditing: false,
      },
    });
  });

  it('should renders Step1 component', () => {
    render(
      <Provider store={store}>
        <Router>
          <Step1 />
        </Router>
      </Provider>
    );

    expect(screen.getByText(STEP1_TITLE)).toBeInTheDocument();
    expect(screen.getByText(STEP1_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(STEP1_RANDOM)).toBeInTheDocument();
    expect(screen.getByText(RESTART)).toBeInTheDocument();
  });

  it('should set cuisineType to correct value on click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Step1 />
        </Router>
      </Provider>
    );

    const cuisine = screen.getByText(STEP1_CUISINES[0]);
    fireEvent.click(cuisine);
    const actions = (store as any).getActions();
    expect(actions).toEqual([setCuisine(STEP1_CUISINES[0])]);
  });

  it('should update cuisineType to correct value on click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Step1 />
        </Router>
      </Provider>
    );

    const actions = (store as any).getActions();
    const cuisine = screen.getByText(STEP1_CUISINES[0]);
    fireEvent.click(cuisine);
    expect(actions).toEqual([setCuisine(STEP1_CUISINES[0])]);
    const cuisine2 = screen.getByText(STEP1_CUISINES[1]);
    fireEvent.click(cuisine2);
    expect(actions).toEqual([setCuisine(STEP1_CUISINES[0]),setCuisine(STEP1_CUISINES[1])]);
  });
});