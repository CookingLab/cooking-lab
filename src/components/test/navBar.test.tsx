/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import NavBar from '../navBar';
import {
    DEBUG
  } from '../../i18n/constants';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('NavBar component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: '',
        selectedMealType: '',
        selectedDiet: [],
        selectedHealth: [],
        isEditing: false,
      },
    });
    
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
  });
  
  it('should render NavBar component', () => {
    expect(screen.getByAltText('Cooking Lab Logo')).toBeInTheDocument();
  });

  it('should render Debug component when hostname is localhost', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'localhost'
      },
      writable: true
    });
  
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
  
    expect(screen.getAllByText(DEBUG)).toBeDefined();
  });
});
