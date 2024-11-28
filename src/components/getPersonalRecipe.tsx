/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useParams } from 'react-router-dom';
import { PersonalRecipe } from '../interfaces/recipeInterface';
import PersonalRecipePage from './personalRecipePage';
import axios from 'axios';

const GetPersonalRecipe = () => {

  const [recipe, setRecipe] = useState<PersonalRecipe>({ id: 0, title: '', ingredients: [], instructions: [], imageURL: '' });

  const { id } = useParams();
  const endpoint = useSelector((state: RootState) => state.cookingLab.backEndEndpoint);

  let targetEndpoint = 'https://cooking-lab-personal-recipe-api.onrender.com';

  if(endpoint === 'prod'){
    targetEndpoint = 'https://cooking-lab-personal-recipe-api.onrender.com';
  }else{
    targetEndpoint = 'http://localhost:8080';
  }

  async function handlePersonalRecipeClick() {
    try {
      const response = await axios.get(`${targetEndpoint}/api/recipes/personal/${id}`);
      const data = response.data;
      setRecipe({id: data[0].id, title: data[0].title, ingredients: data[0].ingredients, instructions: data[0].instructions, imageURL: data[0].imageURL});
      return data;
    } catch (error) {
      console.error(`Error fetching ${id} recipes:`, error);
      return [];
    }
  }

  useEffect(() => {
    handlePersonalRecipeClick();
  }, [id]);

  return (
    <div>
      <PersonalRecipePage
        id={recipe.id}
        title={recipe.title}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
        imageURL={recipe.imageURL}
      />
    </div>
  );
};

export default GetPersonalRecipe;
