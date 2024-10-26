import React from 'react';
import logo from '../img/cookingLabLogo1.png';
import { 
  TML_LINKEDIN,
  TC_LINKEDIN,
  TML,
  TC,
  COPYRIGHT,
} from '../i18n/constants';

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top background-color footer">
      <div className="col-md-4 d-flex align-items-center mx-3">
        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <img className="bi" src={logo} width="30" height="24" alt="Cooking Lab Logo"/>
        </a>
        <span className="mb-3 mb-md-0 footer-copyright">{COPYRIGHT}</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-3">
        <li className="ms-3">
          <a className="footer-link" href={TML_LINKEDIN} target="_blank" rel="noreferrer">{TML}</a>
        </li>
        <li className="ms-3">
          <a className="footer-link" href={TC_LINKEDIN} target="_blank" rel="noreferrer">{TC}</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;