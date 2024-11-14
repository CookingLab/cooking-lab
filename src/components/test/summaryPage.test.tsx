/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import SummaryPage from '../summaryPage';
import {
  STEP3_DIETS,
  STEP4_ALLERGIES,
  SUMMARY_DESCRIPTION,
  SUMMARY_EDIT,
  SUMMARY_GET_RECIPE,
  SUMMARY_STEP1,
  SUMMARY_STEP1_LABEL,
  SUMMARY_STEP2,
  SUMMARY_STEP2_LABEL,
  SUMMARY_STEP3,
  SUMMARY_STEP3_LABEL,
  SUMMARY_STEP4,
  SUMMARY_STEP4_LABEL,
  SUMMARY_TITLE,
} from '../../i18n/constants';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('Summary component', () => {
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
          <SummaryPage />
        </Router>
      </Provider>
    );
  });
  
  it('should renders Summary component', () => {
    expect(screen.getByText(SUMMARY_TITLE)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP1)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP2)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP3)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP4)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_GET_RECIPE)).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP1_LABEL.trim(), { exact: false })).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP2_LABEL.trim(), { exact: false })).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP3_LABEL.trim(), { exact: false })).toBeInTheDocument();
    expect(screen.getByText(SUMMARY_STEP4_LABEL.trim(), { exact: false })).toBeInTheDocument();
    expect(screen.getAllByText(SUMMARY_EDIT)[0]).toBeInTheDocument();
  });
  
  it('should navigate to step1 on click', () => {
    const step1 = screen.getByTestId('cypress-editStep1')
    fireEvent.click(step1);
    expect(window.location.pathname).toBe('/step1');
  });
  
  it('should navigate to step2 on click', () => {
    const step2 = screen.getByTestId('cypress-editStep2')
    fireEvent.click(step2);
    expect(window.location.pathname).toBe('/step2');
  });
  
  it('should navigate to step3 on click', () => {
    const step3 = screen.getByTestId('cypress-editStep3')
    fireEvent.click(step3);
    expect(window.location.pathname).toBe('/step3');
  });
  
  it('should navigate to step4 on click', () => {
    const step4 = screen.getByTestId('cypress-editStep4')
    fireEvent.click(step4);
    expect(window.location.pathname).toBe('/step4');
  });
  
  it('should navigate to recipe on click', () => {
    const getRecipe = screen.getByTestId('cypress-getRecipe')
    fireEvent.click(getRecipe);
    expect(window.location.pathname).toBe('/recipe');
  });
  
  it ('should display multiple diets and healths and go back to step4', () => {
    store = mockStore({
      cookingLab: {
        selectedCuisine: '',
        selectedMealType: '',
        selectedDiet: [STEP3_DIETS[0], STEP3_DIETS[1]],
        selectedHealth: [STEP4_ALLERGIES[0], STEP4_ALLERGIES[1]],
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <SummaryPage />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getAllByTestId('prev-icon')[0];

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/step4');
  });
});
