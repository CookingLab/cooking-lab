import React from 'react';
import logo from '../img/cookingLabLogo1.png';
import { 
  TML_LINK,
  TC_LINK,
  TML,
  TC,
  COPYRIGHT,
  PROVIDER,
  POWERED_BY,
  POWERED_BY_LINK,
} from '../i18n/constants';

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top background-color footer">
      <div className="col-md-4 d-flex flex-column align-items-start">
        <div className="d-flex align-items-center mb-3 mx-3">
          <img className="bi me-2 text-muted text-decoration-none lh-1" src={logo} width="30" height="24" alt="Cooking Lab Logo"/>
          <span className="footer-copyright" data-testid="footer-copyright">{COPYRIGHT}</span>
        </div>
        <p className="footer-copyright mx-3" data-testid="footer-power">{POWERED_BY}<a className="footer-link" data-testid="footer-power-link" href={POWERED_BY_LINK} target="_blank" rel="noreferrer">{PROVIDER}</a></p>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-3">
        <li className="ms-3" data-testid="tm-id">
          <a className="footer-link" href={TML_LINK} target="_blank" rel="noreferrer">{TML}</a>
        </li>
        <li className="ms-3" data-testid="tc-id">
          <a className="footer-link" href={TC_LINK} target="_blank" rel="noreferrer">{TC}</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
