import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../footer';
import { 
  TML_LINK,
  TC_LINK,
  TML,
  TC,
  COPYRIGHT,
  PROVIDER,
  POWERED_BY,
  POWERED_BY_LINK,
} from '../../i18n/constants';

describe('Footer component', () => {

  it('should render copyright text correctly', () => {
    render(<Footer />);
    const copyright = screen.getByTestId('footer-copyright');
    expect(copyright).toHaveTextContent(COPYRIGHT);
  });

  it('should render powered by text and link correctly', () => {
    render(<Footer />);
    const poweredBy = screen.getByTestId('footer-power');
    const poweredByLink = screen.getByTestId('footer-power-link');
    expect(poweredBy).toHaveTextContent(POWERED_BY);
    expect(poweredByLink).toHaveAttribute('href', POWERED_BY_LINK);
    expect(poweredByLink).toHaveTextContent(PROVIDER);
  });

  it('should render TML link with correct href and text', () => {
    render(<Footer />);
    const tmlLink = screen.getByTestId('tm-id').querySelector('a');
    expect(tmlLink).toHaveAttribute('href', TML_LINK);
    expect(tmlLink).toHaveTextContent(TML);
  });

  it('should render TC link with correct href and text', () => {
    render(<Footer />);
    const tcLink = screen.getByTestId('tc-id').querySelector('a');
    expect(tcLink).toHaveAttribute('href', TC_LINK);
    expect(tcLink).toHaveTextContent(TC);
  });
});
