/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import GetPersonalRecipe from '../getPersonalRecipe';

jest.mock('axios');
const mockStore = configureStore([]);

describe('GetPersonalRecipe Component', () => {
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
          <GetPersonalRecipe />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
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
          <GetPersonalRecipe />
        </BrowserRouter>
      </Provider>
    );
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/recipes/personal?id=undefined');
    });
  });
  
  it('should handle response correctly with id from param', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: {} });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/personalRecipe/recipe/1']}>
          <Routes>
            <Route path="/personalRecipe/recipe/:id" element={<GetPersonalRecipe />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://cooking-lab-personal-recipe-api.onrender.com/api/recipes/personal?id=1'
      );
    });
  });

});
