import {
  RECIPE_INGREDIENT,
  RECIPE_LINK,
  RECIPE_LOADER,
  RECIPE_ERROR_TITLE,
  RECIPE_ERROR_MESSAGE,
  RECIPE_ERROR_SUB_MESSAGE,
  FIRST_RECIPE_DELAY_MESSAGE,
  SORRY_MSG,
  RECIPE_GENERATE,
  SAVE_RECIPE,
} from '../i18n/constants';
import React, { useEffect, useState } from 'react';
import RestartButton from './restartButton';
import { useNavigate } from 'react-router-dom';
import { RecipeProps } from '../interfaces/recipeInterface';
import logo from '../img/cookingLabLogo1.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { addSavedRecipe, setRecipeGenerate } from '../redux/cookingLabSlice';

const RecipePage = ({label, image, ingredients, url}: RecipeProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstRecipeDelayMsg, setFirstRecipeDelayMsg] = useState(false);
  const isQuickRecipeState = useSelector((state: RootState) => state.cookingLab.isQuickRecipe);
  
  const handleRegenerate = () => {
    dispatch(setRecipeGenerate());
  }

  const handleSaveRecipe = () => {
    // TODO
    console.log('Saving recipe');
    dispatch(addSavedRecipe({ name: 'Hamburger', url: 'www.blablabla' }));
    dispatch(addSavedRecipe({ name: 'Pizza', url: 'www.blablabla' }));
  }
  
  useEffect(() => {
    if (!label) {
      setLoading(true);
      setTimeout(() => {
        setFirstRecipeDelayMsg(true);
      }, 10000);
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
            !firstRecipeDelayMsg ? (
              <div className="loading-container">
                <h1>{RECIPE_LOADER}</h1>
                <img src={logo} alt="Loading..." className="loading-logo" />
              </div>
            ) : (
              <div className="loading-container">
                <h1>{SORRY_MSG}</h1>
                <p>{FIRST_RECIPE_DELAY_MESSAGE}</p>
                <img src={logo} alt="Loading..." className="loading-logo" />
              </div>
            )
          ) : (
            error ? (
              <div className="error-container">
                <h2>{RECIPE_ERROR_TITLE}</h2>
                <p>{RECIPE_ERROR_MESSAGE}</p>
                <p>{RECIPE_ERROR_SUB_MESSAGE}</p>
                <i
                  data-testid="error-back-icon"
                  className="bi bi-arrow-left-circle-fill me-auto"
                  style={{ fontSize: '2rem', cursor: 'pointer' }}
                  onClick={() => navigate('/summary')}
                />
              </div>
            ) :
              <>
                <div className="row mb-4">
                  <div className="col-md-8">
                    <h1 className="card-title" data-testid="recipe-label">{label}</h1>
                    <h3 data-testid="recipe-ingredient">{RECIPE_INGREDIENT}</h3>
                    <ul className="list-group" data-testid="recipe-ingredient-list">
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
                    <h3 className="mt-4" data-testid="recipe-link">{RECIPE_LINK}</h3>
                    <a className="cooking-lab-link" href={url} target="_blank" rel="noreferrer">{url}</a>
                  </div>
                </div>
                {!isQuickRecipeState && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i
                      data-testid="back-icon"
                      className="bi bi-arrow-left-circle-fill me-3 ms-3"
                      style={{ fontSize: '2rem', cursor: 'pointer' }}
                      onClick={() => navigate('/summary')}
                    />
                    <button
                      data-testid="regenerate-btn"
                      className="btn btn-dark cooking-lab-btn me-3 ms-3"
                      onClick={() => handleRegenerate()}
                    >
                      {RECIPE_GENERATE}
                    </button>
                    <button
                      data-testid="save-recipe-btn"
                      className="btn btn-dark cooking-lab-btn me-3 ms-3"
                      onClick={() => handleSaveRecipe()}
                    >
                      {SAVE_RECIPE}
                    </button>
                  </div>
                )}
                {isQuickRecipeState && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      data-testid="save-recipe-btn"
                      className="btn btn-dark cooking-lab-btn me-3 ms-3"
                      onClick={() => handleSaveRecipe()}
                    >
                      {SAVE_RECIPE}
                    </button>
                  </div>
                )}
              </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
