/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  PERSONAL_RECIPES_TITLE,
  PERSONAL_RECIPES_MSG,
  TC_RECIPE,
  TM_RECIPE,
} from '../i18n/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useNavigate } from 'react-router-dom';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
}

const PersonalRecipes = () => {
  const navigate = useNavigate();
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
        const response = await fetch(`${targetEndpoint}/api/recipes/personal?owner=${owner}`);
        const data = await response.json();
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

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="card shadow mb-5">
          <div className="card-body card-body-bg">
            <h1><strong data-testid="personal-recipes-title">{PERSONAL_RECIPES_TITLE}</strong></h1>
            <p className="mb-5" data-testid="personal-recipes-msg">{PERSONAL_RECIPES_MSG}</p>
            <div className="row">
              <div className="col-md-6">
                <h2><strong data-testid="tc-recipes-title">{TC_RECIPE}</strong></h2>
                {tcRecipes.map(recipe => (
                  <div key={recipe.id} className="card mb-3 recipe-card" onClick={() => navigateToRecipe(recipe.id)}>
                    <div className="card-body">
                      <h3 className="card-title">{recipe.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-1 text-center">
                <div className="vertical-line"></div>
              </div>
              <div className="col-md-5">
                <h2><strong data-testid="tm-recipes-title">{TM_RECIPE}</strong></h2>
                {tmRecipes.map(recipe => (
                  <div key={recipe.id} className="card mb-3 recipe-card" onClick={() => navigateToRecipe(recipe.id)}>
                    <div className="card-body">
                      <h3 className="card-title">{recipe.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecipes;
