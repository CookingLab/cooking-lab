import {
    RECIPE_INGREDIENT,
    RECIPE_LOADER,
    RECIPE_ERROR_TITLE,
    RECIPE_ERROR_MESSAGE,
    RECIPE_ERROR_SUB_MESSAGE,
    FIRST_RECIPE_DELAY_MESSAGE,
    SORRY_MSG,
    RECIPE_INSTRUCTIONS
} from '../i18n/constants';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalRecipe } from '../interfaces/recipeInterface';
import logo from '../img/cookingLabLogo1.png';

const PersonalRecipePage = ({id, title, ingredients, instructions}: PersonalRecipe) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [firstRecipeDelayMsg, setFirstRecipeDelayMsg] = useState(false);

    useEffect(() => {
        if (!title) {
            setLoading(true);
            setTimeout(() => {
                setFirstRecipeDelayMsg(true);
            }, 10000);
        } else if (title === 'Error') {
            setLoading(false);
            setError(true);
        } else {
            setLoading(false);
        }
    }, [title]);

    return (
        <div className="container mt-5">
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
                        onClick={() => navigate('/personalRecipe')}
                        />
                    </div>
                    ) :
                    <>
                        <div className="row mb-4">
                            <div className="col-md-8">
                                <h1 className="card-title" data-testid="recipe-label">{title}</h1>
                                <h3 data-testid="recipe-ingredient">{RECIPE_INGREDIENT}</h3>
                                <ul className="list-group" data-testid="recipe-ingredient-list">
                                {ingredients?.map(ingredient => (
                                    <li className="list-group-item" key={ingredient}>{ingredient}</li>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-8">
                                <h3 data-testid="recipe-instructions">{RECIPE_INSTRUCTIONS}</h3>
                                <ol className="list-group instructions-ordered-list" data-testid="recipe-instructions-list">
                                    {instructions?.map((instruction, index) => (
                                        <li className="list-group-item" key={index}>{instruction}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="row mb-4">
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i
                            data-testid="back-icon"
                            className="bi bi-arrow-left-circle-fill me-3 ms-3"
                            style={{ fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => navigate('/personalRecipe')}
                            />
                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}
  
export default PersonalRecipePage;
  