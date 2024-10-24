import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeProps } from '../src/interfaces/recipeInterface';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RecipePage from 'components/recipePage';

const ApiApp = () => {
  const [recipe, setRecipe] = useState<RecipeProps>({ label: '', image: '', ingredients: [], url: '' });
  
  const cuisineType = useSelector((state: RootState) => state.cookingLab.selectedCuisine);
  const mealType = useSelector((state: RootState) => state.cookingLab.selectedMealType);
  const diet = useSelector((state: RootState) => state.cookingLab.selectedDiet);
  const health = useSelector((state: RootState) => state.cookingLab.selectedHealth);

  const getRecipes = async () => {
    try {
      let url = `http://localhost:3001/recipes?cuisineType=${cuisineType}&mealType=${mealType}`;
  
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
    // </>
  );
};

export default ApiApp;
