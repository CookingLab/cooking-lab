import {
  RECIPE_INGREDIENT,
  RECIPE_LINK
} from '../i18n/constants';
import React from 'react';
import RestartButton from './restartButton';
import logo from '../img/cookingLabLogo2.png'; // This is a placeholder image
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-8">
              <h1 className="card-title">Place holder Title</h1>
              <h3>{RECIPE_INGREDIENT}</h3>
              <ul className="list-group">
                <li className="list-group-item">Ingredient 1 (Quantity)</li>
                <li className="list-group-item">Ingredient 2 (Quantity)</li>
                <li className="list-group-item">Ingredient 3 (Quantity)</li>
                <li className="list-group-item">Ingredient 4 (Quantity)</li>
                <li className="list-group-item">Ingredient 5 (Quantity)</li>
                <li className="list-group-item">Ingredient 6 (Quantity)</li>
                <li className="list-group-item">Ingredient 7 (Quantity)</li>
                <li className="list-group-item">Ingredient 8 (Quantity)</li>
                <li className="list-group-item">Ingredient 9 (Quantity)</li>
                <li className="list-group-item">Ingredient 10 (Quantity)</li>
              </ul>
            </div>
            <div className="col-md-4 text-center">
              <img src={logo} alt="Cooking Lab Logo" className="img-fluid shadow" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="bi bi-arrow-left-circle-fill me-3 ms-3"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => navigate('/summary')}
            />
            <div className="row">
              <div className="col">
                <h3 className="mt-4">{RECIPE_LINK}</h3>
                <a className="cooking-lab-link" href="http://google.com" target="_blank" rel="noreferrer">Link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
