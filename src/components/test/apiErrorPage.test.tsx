import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApiErrorPage from '../apiErrorPage';
import {
  RECIPE_ERROR_MESSAGE,
  RECIPE_ERROR_SUB_MESSAGE,
  RECIPE_LOADER,
} from '../../i18n/constants';

describe('ApiErrorPage', () => {

  test('renders loading state when statusCode is 0', () => {
    render(
      <MemoryRouter>
        <ApiErrorPage statusCode={0} statusMsg="" />
      </MemoryRouter>
    );

    expect(screen.getByText(RECIPE_LOADER)).toBeInTheDocument();
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });

  test('renders error state when statusCode is not 0', () => {
    const statusCode = 404;
    const statusMsg = 'Not Found';

    render(
      <MemoryRouter>
        <ApiErrorPage statusCode={statusCode} statusMsg={statusMsg} />
      </MemoryRouter>
    );

    expect(screen.getByText(`${statusCode} - ${statusMsg}`)).toBeInTheDocument();
    expect(screen.getByText(RECIPE_ERROR_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(RECIPE_ERROR_SUB_MESSAGE)).toBeInTheDocument();
  });

  test('navigates back to personalRecipe on icon click', () => {
    render(
      <MemoryRouter>
        <ApiErrorPage statusCode={404} statusMsg="Not Found" />
      </MemoryRouter>
    );

    const backIcon = screen.getByTestId('error-back-icon');
    fireEvent.click(backIcon);
  });
});