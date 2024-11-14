import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Step3 from '../step3';
import { STEP3_TITLE, STEP_OPTIONAL, STEP3_SELECT_LABEL, STEP3_DROPDOWN, STEP3_DIETS, RESTART } from '../../i18n/constants';

import { setDiet } from '../../redux/cookingLabSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import {formatInputValue} from '../../utils/index';

const mockStore = configureStore([]);
let store: Store<unknown, UnknownAction, unknown>;

describe('Step3 component', () => {
  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        selectedDiet: [],
        selectedMealType: [],
        isEditing: false,
      },
    });
    
    render(
      <Provider store={store}>
        <Router>
          <Step3 />
        </Router>
      </Provider>
    );
  });

  it('should renders Step3 component', () => {
    expect(screen.getByText(STEP3_TITLE)).toBeInTheDocument();
    expect(screen.getByText(STEP_OPTIONAL)).toBeInTheDocument();
    expect(screen.getByText(STEP3_DROPDOWN)).toBeInTheDocument();
    expect(screen.getByText(RESTART)).toBeInTheDocument();
  });

  it('should set diet to correct value on click', () => {
    const dropdown = screen.getByText(STEP3_DROPDOWN);
    fireEvent.click(dropdown);
    const diet = screen.getByText(formatInputValue(STEP3_DIETS[0]));
    fireEvent.click(diet);
    const actions = (store as any).getActions();
    expect(actions).toEqual([setDiet(STEP3_DIETS[0])]);
  });

  it('should update diet to correct value on click', () => {
    const actions = (store as any).getActions();
    const dropdown = screen.getByText(STEP3_DROPDOWN);
    fireEvent.click(dropdown);
    const diet = screen.getByText(formatInputValue(STEP3_DIETS[0]));
    fireEvent.click(diet);
    expect(actions).toEqual([setDiet(STEP3_DIETS[0])]);
    fireEvent.click(dropdown);
    const diet2 = screen.getByText(formatInputValue(STEP3_DIETS[1]));
    fireEvent.click(diet2);
    expect(actions).toEqual([setDiet(STEP3_DIETS[0]),setDiet(STEP3_DIETS[1])]);
  });
  
//   it ('should handle next button click to summary', () => {
//     store = mockStore({
//       cookingLab: {
//         selectedDiet: [STEP3_DIETS[0]],
//         isEditing: true,
//       },
//     });

//     render(
//       <Provider store={store}>
//         <Router>
//           <Step3 />
//         </Router>
//       </Provider>
//     );
//     const nextIcon = screen.getAllByTestId('next-icon')[0];

//     fireEvent.click(nextIcon);
//     expect(window.location.pathname).toBe('/summary');
//   });
  
  it ('should handle next button click to ste4', () => {
    store = mockStore({
      cookingLab: {
        selectedDiet: [STEP3_DIETS[0]],
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step3 />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getAllByTestId('next-icon')[0];

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/step4');
  });
  
  it ('should handle previous button click to step2', () => {
    store = mockStore({
      cookingLab: {
        selectedDiet: [STEP3_DIETS[0]],
        isEditing: false,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Step3 />
        </Router>
      </Provider>
    );
    const nextIcon = screen.getAllByTestId('prev-icon')[0];

    fireEvent.click(nextIcon);
    expect(window.location.pathname).toBe('/step2');
  });
});
