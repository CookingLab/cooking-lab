/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  PERSONAL_RECIPES_TITLE,
  PERSONAL_RECIPES_MSG,
  TC_RECIPE,
  TM_RECIPE,
  RECIPE_LOADING,
} from '../i18n/constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as CookingLabSlice from '../redux/cookingLabSlice';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
}

const PersonalRecipes = () => {
  const tienExpanded = useSelector((state: RootState) => state.cookingLab.isTienRecipesExpanded);
  const tmExpanded = useSelector((state: RootState) => state.cookingLab.isTmRecipesExpanded);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tcRecipes, setTcRecipes] = useState<Recipe[]>([]);
  const [tmRecipes, setTmRecipes] = useState<Recipe[]>([]);
  const endpoint = useSelector((state: RootState) => state.cookingLab.backEndEndpoint);

  let targetEndpoint = 'https://cooking-lab-personal-recipe-api.onrender.com';

  if(endpoint === 'prod'){
    targetEndpoint = 'https://cooking-lab-personal-recipe-api.onrender.com';
  }else{
    targetEndpoint = 'http://localhost:8080';
  }

  useEffect(() => {
    const fetchRecipes = async (owner: string) => {
      try {
        const response = await axios(`${targetEndpoint}/api/recipes/personal?owner=${owner}`);
        const data = response.data;
        return data;
      } catch (error) {
        console.error(`Error fetching ${owner} recipes:`, error);
        return [];
      }
    };

    const fetchAllRecipes = async () => {
      const [tcData, tmData] = await Promise.all([fetchRecipes('tc'), fetchRecipes('tm')]);
      setTcRecipes(tcData);
      setTmRecipes(tmData);
    };

    fetchAllRecipes();
  }, []);

  function navigateToRecipe(id: number){
    navigate('/personalRecipe/recipe/' + id);
  }

  function toggleExpandTienRecipes(){
    dispatch(CookingLabSlice.setTienRecipesExtended(!tienExpanded));
  }

  function toggleExpandTmRecipes(){
    dispatch(CookingLabSlice.setTmRecipesExtended(!tmExpanded));
  }

  return (
    <div className="App">
      <div className="container mt-5" data-aos="fade-right">
        <div className="card shadow mb-5">
          <div className="card-body card-body-bg">
            <h1><strong data-testid="personal-recipes-title">{PERSONAL_RECIPES_TITLE}</strong></h1>
            {tcRecipes.length === 0 || tmRecipes.length === 0
              ? <p>{RECIPE_LOADING}</p> 
              : (
                <>
                  <p className="mb-5" data-testid="personal-recipes-msg">{PERSONAL_RECIPES_MSG}</p><div className="row">
                    <div className="col-md-6">
                      <h2><strong data-testid="tc-recipes-title">{TC_RECIPE}</strong></h2>
                      {!tienExpanded && tcRecipes.slice(0, 3).map(recipe => (
                        <button key={recipe.id} className="card mb-3 recipe-card" onClick={() => navigateToRecipe(recipe.id)}>
                          <div className="card-body">
                            <h3 className="card-title">{recipe.title}</h3>
                          </div>
                        </button>
                      ))}
                      {tienExpanded && tcRecipes.map(recipe => (
                        <button key={recipe.id} className="card mb-3 recipe-card" onClick={() => navigateToRecipe(recipe.id)}>
                          <div className="card-body">
                            <h3 className="card-title">{recipe.title}</h3>
                          </div>
                        </button>
                      ))}
                      <button className="btn btn-dark" onClick={toggleExpandTienRecipes}>
                        {tienExpanded ? 'See Less' : 'See More'}
                      </button>
                    </div>
                    <div className="col-md-1 text-center">
                      <div className="vertical-line"></div>
                    </div>
                    <div className="col-md-5">
                      <h2><strong data-testid="tm-recipes-title">{TM_RECIPE}</strong></h2>
                      {!tmExpanded && tmRecipes.slice(0, 3).map(recipe => (
                        <button key={recipe.id} className="card mb-3 recipe-card" onClick={() => navigateToRecipe(recipe.id)}>
                          <div className="card-body">
                            <h3 className="card-title">{recipe.title}</h3>
                          </div>
                        </button>
                      ))}
                      {tmExpanded && tmRecipes.map(recipe => (
                        <button key={recipe.id} className="card mb-3 recipe-card" onClick={() => navigateToRecipe(recipe.id)}>
                          <div className="card-body">
                            <h3 className="card-title">{recipe.title}</h3>
                          </div>
                        </button>
                      ))}
                      <button className="btn btn-dark" onClick={toggleExpandTmRecipes}>
                        {tmExpanded ? 'See Less' : 'See More'}
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecipes;
