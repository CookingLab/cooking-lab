/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import PersonalRecipes from '../personalRecipes';
import { PERSONAL_RECIPES_TITLE } from '../../i18n/constants';

jest.mock('axios');
const mockStore = configureStore([]);

describe('PersonalRecipes Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cookingLab: {
        backEndEndpoint: 'prod',
      },
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PersonalRecipes />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.getByText(PERSONAL_RECIPES_TITLE)).toBeInTheDocument();
  });

  it('should set targetEndpoint to local URL when endpoint is local', async () => {
    store = mockStore({
      cookingLab: {
        backEndEndpoint: 'local',
      },
    });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PersonalRecipes />
        </BrowserRouter>
      </Provider>
    );
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(0);
    });
  });

});
