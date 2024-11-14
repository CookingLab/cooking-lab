/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Step4 from '../step4';
import { clearHealth, setHealth } from '../../redux/cookingLabSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import {formatInputValue} from '../../utils/index';
import {
  STEP_OPTIONAL,
  STEP4_TITLE,
  STEP4_DROPDOWN,
  STEP4_DROPDOWN_ALLERGIES,
  STEP4_DROPDOWN_RESTRICTIONS,
  STEP4_ALLERGIES,
  RESTART,
  STEP4_RESTRICTIONS,
} from '../../i18n/constants';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('Step4 component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedHealth: [],
        isEditing: false,
        selectedDiet: [],
      },
    });
    
    render(
      <Provider store={store}>
        <Router>
          <Step4 />
        </Router>
      </Provider>
    );
  });

  it('should renders Step4 component', () => {
    expect(screen.getByText(STEP4_TITLE)).toBeInTheDocument();
    expect(screen.getByText(STEP_OPTIONAL)).toBeInTheDocument();
    expect(screen.getByText(STEP4_DROPDOWN_ALLERGIES)).toBeInTheDocument();
    expect(screen.getByText(STEP4_DROPDOWN_RESTRICTIONS)).toBeInTheDocument();
    expect(screen.getByText(STEP4_DROPDOWN)).toBeInTheDocument();
    expect(screen.getByText(RESTART)).toBeInTheDocument();
  });

  it('should set health to correct allergy value on click', () => {
    const allergiesDropdown = screen.getByText(STEP4_DROPDOWN_ALLERGIES);
    fireEvent.click(allergiesDropdown);
    const health = screen.getByText(formatInputValue(STEP4_ALLERGIES[0]));
    fireEvent.click(health);
    const actions = (store as any).getActions();
    expect(actions).toEqual([setHealth(STEP4_ALLERGIES[0])]);
  });
  
  it('should set health to correct restriction value on click', () => {
    const restrictionsDropdown = screen.getByText(STEP4_DROPDOWN_RESTRICTIONS);
    fireEvent.click(restrictionsDropdown);
    const health = screen.getByText(formatInputValue(STEP4_RESTRICTIONS[0]));
    fireEvent.click(health);
    const actions = (store as any).getActions();
    expect(actions).toEqual([setHealth(STEP4_RESTRICTIONS[0])]);
  });

  it ('should handle next button click to summary', () => {
    store = mockStore({
      cookingLab: {
        selectedHealth: [STEP4_ALLERGIES[0]],
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step4 />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getAllByTestId('next-icon')[0];

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/summary');
  });
  
  it ('should handle previous button click to step3', () => {
    store = mockStore({
      cookingLab: {
        selectedHealth: [STEP4_ALLERGIES[0]],
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step4 />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getAllByTestId('prev-icon')[0];

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/step3');
  });
  
  it ('should be able to clear the selected diet', () => {
    store = mockStore({
      cookingLab: {
        selectedHealth: [STEP4_ALLERGIES[0]],
        isEditing: true,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step4 />
        </Router>
      </Provider>
    );
    const removeHealth = screen.getByTestId('remove-health');
    fireEvent.click(removeHealth);
    const actions = (store as any).getActions();
    expect(actions).toEqual([clearHealth(STEP4_ALLERGIES[0])]);
  });
});
