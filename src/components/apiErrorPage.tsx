
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../interfaces/recipeInterface';
import {
  RECIPE_ERROR_MESSAGE,
  RECIPE_ERROR_SUB_MESSAGE,
  RECIPE_LOADER,
} from '../i18n/constants';
import logo from '../img/cookingLabLogo1.png';

const ApiErrorPage = ({ statusCode, statusMsg }: ApiError) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mt-5">
      <div className="card shadow mb-5">
        <div className="card-body card-body-bg">
          {statusCode === 0 ? (
            <div className="loading-container">
              <h1>{RECIPE_LOADER}</h1>
              <img src={logo} alt="Loading..." className="loading-logo" />
            </div>
          ) : (
            <div className="error-container">
              <h2>{statusCode} - {statusMsg}</h2>
              <p className="mt-2">{RECIPE_ERROR_MESSAGE}</p>
              <p>{RECIPE_ERROR_SUB_MESSAGE}</p>
              <i
                data-testid="error-back-icon"
                className="bi bi-arrow-left-circle-fill me-auto"
                style={{ fontSize: '2rem', cursor: 'pointer' }}
                onClick={() => navigate('/personalRecipe')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiErrorPage;
