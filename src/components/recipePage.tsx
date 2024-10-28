import {
  RECIPE_INGREDIENT,
  RECIPE_LINK,
  RECIPE_LOADER,
  RECIPE_ERROR_TITLE,
  RECIPE_ERROR_MESSAGE,
  RECIPE_ERROR_SUB_MESSAGE
} from '../i18n/constants';
import React, { useEffect, useState } from 'react';
import RestartButton from './restartButton';
import { useNavigate } from 'react-router-dom';
import { RecipeProps } from '../interfaces/recipeInterface';
import logo from '../img/cookingLabLogo1.png';

const RecipePage = ({label, image, ingredients, url}: RecipeProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!label) {
      setLoading(true);
    } else if (label === 'Error') {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
    }
  }, [label]);
  
  return (
    <div className="container mt-5">
      <RestartButton />
      <div className="card shadow mb-5">
        <div className="card-body card-body-bg">
          {loading ? (
            <div className="loading-container">
              <h1>{RECIPE_LOADER}</h1>
              <img src={logo} alt="Loading..." className="loading-logo" />
            </div>
          ) : (
            error ? (
              <div className="error-container">
                <h2>{RECIPE_ERROR_TITLE}</h2>
                <p>{RECIPE_ERROR_MESSAGE}</p>
                <p>{RECIPE_ERROR_SUB_MESSAGE}</p>
                <i
                  className="bi bi-arrow-left-circle-fill me-auto"
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  onClick={() => navigate('/summary')}
                />
              </div>
            ) :
              <>
                <div className="row mb-4">
                  <div className="col-md-8">
                    <h1 className="card-title">{label}</h1>
                    <h3>{RECIPE_INGREDIENT}</h3>
                    <ul className="list-group">
                      {ingredients?.map(ingredient => (
                        <li className="list-group-item" key={ingredient.text}>{ingredient.text}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-4 text-center">
                    <img src={image} alt={label} className="img-fluid shadow rounded" />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-8">
                    <h3 className="mt-4">{RECIPE_LINK}</h3>
                    <a className="cooking-lab-link" href={url} target="_blank" rel="noreferrer">{url}</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <i
                    className="bi bi-arrow-left-circle-fill me-3 ms-3"
                    style={{ fontSize: '2rem', cursor: 'pointer' }}
                    onClick={() => navigate('/summary')}
                  />
                </div>
              </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
