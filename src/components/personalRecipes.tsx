import React, { useEffect, useState } from 'react';
import {
  PERSONAL_RECIPES_TITLE,
  TC_RECIPE,
  TM_RECIPE,
} from '../i18n/constants';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
}

const PersonalRecipes = () => {
  const [tcRecipes, setTcRecipes] = useState<Recipe[]>([]);
  const [tmRecipes, setTmRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async (owner: string) => {
      try {
        const response = await fetch(`https://cooking-lab-personal-recipe-api.onrender.com/api/recipes/personal?owner=${owner}`);
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

  return (
    <div className="App">
      <div className="container mt-5">
        <h1>{PERSONAL_RECIPES_TITLE}</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>{TC_RECIPE}</h2>
            {tcRecipes.map(recipe => (
              <div key={recipe.id} className="card mb-3 recipe-card">
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
            <h2>{TM_RECIPE}</h2>
            {tmRecipes.map(recipe => (
              <div key={recipe.id} className="card mb-3 recipe-card">
                <div className="card-body">
                  <h3 className="card-title">{recipe.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalRecipes;
