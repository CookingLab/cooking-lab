/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Step2 from '../step2';
import { clearMeat, setMealType, setMeat } from '../../redux/cookingLabSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import {formatInputValue} from '../../utils/index';
import {
  STEP2_TITLE,
  STEP2_DESCRIPTION,
  STEP2_BREAKFAST,
  STEP2_BRUNCH,
  STEP2_LUNCH,
  STEP2_DINNER,
  STEP2_SNACK,
  STEP2_TEATIME,
  RESTART,
  MEAT_DROPDOWN,
  MEAT_VALUES
} from '../../i18n/constants';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('Step2 component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedMealType: '',
        isEditing: false,
      },
    });
    
    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
  });

  it('should renders Step2 component', () => {
    expect(screen.getByText(STEP2_TITLE)).toBeInTheDocument();
    expect(screen.getByText(STEP2_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(STEP2_BREAKFAST)).toBeInTheDocument();
    expect(screen.getByText(STEP2_BRUNCH)).toBeInTheDocument();
    expect(screen.getByText(STEP2_LUNCH)).toBeInTheDocument();
    expect(screen.getByText(STEP2_DINNER)).toBeInTheDocument();
    expect(screen.getByText(STEP2_SNACK)).toBeInTheDocument();
    expect(screen.getByText(STEP2_TEATIME)).toBeInTheDocument();
    expect(screen.getByText(RESTART)).toBeInTheDocument();
  });

  it('should set mealType to correct value on click', () => {
    const mealType = screen.getByText(formatInputValue(STEP2_DINNER));
    fireEvent.click(mealType);
    const actions = (store as any).getActions();
    expect(actions).toEqual([setMealType(STEP2_DINNER.toLowerCase())]);
  });

  it('should update mealType to correct value on click', () => {
    const actions = (store as any).getActions();
    const mealType = screen.getByText(formatInputValue(STEP2_DINNER));
    fireEvent.click(mealType);
    expect(actions).toEqual([setMealType(STEP2_DINNER.toLowerCase())]);
    const mealType2 = screen.getByText(formatInputValue(STEP2_LUNCH));
    fireEvent.click(mealType2);
    expect(actions).toEqual([setMealType(STEP2_DINNER.toLowerCase()),setMealType(STEP2_LUNCH.toLowerCase())]);
  });
  
  it ('should handle next button click to summary', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: STEP2_DINNER,
        isEditing: true,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getByTestId('next-icon');

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/summary');
  });
  
  it ('should handle next button click to step3', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: STEP2_DINNER,
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getByTestId('next-icon');

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/step3');
  });
  
  it ('should handle previous button click to step1', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: STEP2_DINNER,
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
    const prevIcon = screen.getAllByTestId('prev-icon')[0];

    fireEvent.click(prevIcon);
    expect(window.location.pathname).toBe('/step1');
  });
  
  it('should remove mealType if double clicked', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: STEP2_DINNER,
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
    
    const mealType = screen.getAllByText(formatInputValue(STEP2_DINNER))[0];
    const actions = (store as any).getActions();
    fireEvent.click(mealType);
    expect(actions).toEqual([]);
  });

  it('should handle meat selector correctly', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: 'lunch',
        selectedMeat: '',
        isEditing: false,
      },
    });
  
    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
  
    const meatDropdown = screen.getByText(MEAT_DROPDOWN);
    fireEvent.click(meatDropdown);
  
    const meatOption = screen.getByText(MEAT_VALUES[0]);
    fireEvent.click(meatOption);
  
    const actions = (store as any).getActions();
    expect(actions).toEqual([setMeat(MEAT_VALUES[0])]);
  });
  
  it('should navigate to step3 on next button click when not editing', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: STEP2_DINNER,
        isEditing: false,
      },
    });
  
    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
  
    const nextIcon = screen.getByTestId('next-icon');
    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/step3');
  });
  
  it('should navigate to summary on next button click when editing', () => {
    store = mockStore({
      cookingLab: {
        selectedMealType: STEP2_DINNER,
        isEditing: true,
      },
    });
  
    render(
      <Provider store={store}>
        <Router>
          <Step2 />
        </Router>
      </Provider>
    );
  
    const nextIcon = screen.getByTestId('next-icon');
    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/summary');
  });

});
