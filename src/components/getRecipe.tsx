import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RecipePage from './recipePage';
import { RecipeProps } from '../interfaces/recipeInterface';

const GetRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeProps>({ label: '', image: '', ingredients: [], url: '' });
  
  const cuisineType = useSelector((state: RootState) => state.cookingLab.selectedCuisine);
  const mealType = useSelector((state: RootState) => state.cookingLab.selectedMealType);
  const diet = useSelector((state: RootState) => state.cookingLab.selectedDiet);
  const health = useSelector((state: RootState) => state.cookingLab.selectedHealth);

  const endpoint = useSelector((state: RootState) => state.cookingLab.backEndEndpoint);

  const getRecipes = async () => {
    let targetEndpoint = 'https://cooking-lab-api.onrender.com';

    if(endpoint === 'prod'){
      targetEndpoint = 'https://cooking-lab-api.onrender.com';
    }else{
      targetEndpoint = 'http://localhost:3000';
    }

    try {
      let url = `${targetEndpoint}/api/recipes?cuisineType=${cuisineType}&mealType=${mealType}`;
  
      if (diet.length > 0) {
        const dietParams = diet.map((d: string) => `diet=${d}`).join('&');
        url += `&${dietParams}`;
      }
  
      if (health.length > 0) {
        const healthParams = health.map((h: string) => `health=${h}`).join('&');
        url += `&${healthParams}`;
      }
  
      const response = await axios.get(url);
      console.log(response.data);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipe({ label: 'Error', image: '', ingredients: [], url: '' });
    }
  };

  useEffect(() => {
    getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diet, health, cuisineType, mealType]);

  return (
    <div>
      <RecipePage
        key={recipe.label}
        label={recipe.label}
        image={recipe.image}
        ingredients={recipe.ingredients}
        url={recipe.url}
      />
    </div>
  );
};

export default GetRecipe;
