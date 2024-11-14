import React from 'react';
import { render, screen } from '@testing-library/react';
import IntroductionMsg from '../introductionMsg';
import {
  COOKING_LAB_TITLE,
  COOKING_LAB_MOTTO,
  COOKING_LAB_WELCOME,
  COOKING_LAB_OBJECTIVE
} from '../../i18n/constants';

it('should render IntroductionMsg component', () => {
  render(<IntroductionMsg />);

  const titleElement = screen.getByTestId('intro-title');
  const mottoElement = screen.getByTestId('intro-motto');
  const welcomeElement = screen.getByTestId('intro-welcome');
  const objectiveElement = screen.getByTestId('intro-objective');

  expect(titleElement).toHaveTextContent(COOKING_LAB_TITLE);
  expect(mottoElement).toHaveTextContent(COOKING_LAB_MOTTO);
  expect(welcomeElement).toHaveTextContent(COOKING_LAB_WELCOME);
  expect(objectiveElement).toHaveTextContent(COOKING_LAB_OBJECTIVE);
});
