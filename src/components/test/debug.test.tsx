import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Debug from '../debug';
import * as CookingLabSlice from '../../redux/cookingLabSlice';
import {
    DEBUG,
    STEP1,
    STEP2,
    STEP3,
    STEP4,
    SUMMARY,
    RECIPE,
    ERROR_RECIPE,
    ENDPOINT_SELECTOR,
    LOCAL,
    PROD
} from '../../i18n/constants';

const mockStore = configureStore([]);
const store = mockStore({});

describe('Debug Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Debug />
        </MemoryRouter>
      </Provider>
    );
  });

  test('should have correct DEBUG_CONFIG values', () => {
    const DEBUG_CONFIG = {
      cuisine: 'asian',
      mealType: 'lunch',
      diet: 'low-fat',
      health: 'peanut-free',
      error: 'error'
    };

    expect(DEBUG_CONFIG.cuisine).toBe('asian');
    expect(DEBUG_CONFIG.mealType).toBe('lunch');
    expect(DEBUG_CONFIG.diet).toBe('low-fat');
    expect(DEBUG_CONFIG.health).toBe('peanut-free');
    expect(DEBUG_CONFIG.error).toBe('error');
  });

  test('should toggle visibility', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    expect(screen.getByText(STEP1)).toBeVisible();
    fireEvent.click(button);
    expect(screen.queryByText(STEP1)).toBeNull();
  });

  test('should navigate to step1', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const step1 = screen.getByText(STEP1);
    fireEvent.click(step1);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('asian'));
  });

  test('should navigate to step2', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const step2 = screen.getByText(STEP2);
    fireEvent.click(step2);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('asian'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setMealType('lunch'));
  });

  test('should navigate to step3', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const step3 = screen.getByText(STEP3);
    fireEvent.click(step3);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('asian'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setMealType('lunch'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setDiet('low-fat'));
  });

  test('should navigate to step4', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const step4 = screen.getByText(STEP4);
    fireEvent.click(step4);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('asian'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setMealType('lunch'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setDiet('low-fat'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setHealth('peanut-free'));
  });

  test('should navigate to summary', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const summary = screen.getByText(SUMMARY);
    fireEvent.click(summary);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('asian'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setMealType('lunch'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setDiet('low-fat'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setHealth('peanut-free'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setEditing(true));
  });

  test('should navigate to recipe', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const recipe = screen.getByText(RECIPE);
    fireEvent.click(recipe);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('asian'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setMealType('lunch'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setDiet('low-fat'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setHealth('peanut-free'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setEditing(true));
  });

  test('should navigate to error recipe', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const errorRecipe = screen.getByText(ERROR_RECIPE);
    fireEvent.click(errorRecipe);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setCuisine('error'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setMealType('error'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setDiet('error'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setHealth('error'));
    expect(store.getActions()).toContainEqual(CookingLabSlice.setEditing(true));
  });

  test('should set endpoint to local', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const localEndpoint = screen.getByText(LOCAL);
    fireEvent.click(localEndpoint);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setEndpoint('local'));
  });

  test('should set endpoint to prod', () => {
    const button = screen.getByText(DEBUG);
    fireEvent.click(button);
    const prodEndpoint = screen.getByText(PROD);
    fireEvent.click(prodEndpoint);
    expect(store.getActions()).toContainEqual(CookingLabSlice.setEndpoint('prod'));
  });
});
