/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useParams } from 'react-router-dom';
import { PersonalRecipe } from '../interfaces/recipeInterface';
import ApiErrorPage from './apiErrorPage';
import PersonalRecipePage from './personalRecipePage';
import axios from 'axios';
import { ERROR_500, NO_RESPONSE_500 } from '../i18n/constants';

const GetPersonalRecipe = () => {

  const [recipe, setRecipe] = useState<PersonalRecipe>({ id: 0, title: '', ingredients: [], instructions: [], imageURL: '' });
  const [statusCode, setStatusCode] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  
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
      setStatusCode(200);
      return data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          setStatusCode(error.response.status);
          setStatusMsg(error.response.data);
        } else if (error.response.status === 400) {
          setStatusCode(error.response.status);
          setStatusMsg(error.response.data.error);
        }
      } else if (error.request) {
        // The request was made but the api was blocked or did not respond
        setStatusCode(500);
        setStatusMsg(NO_RESPONSE_500);
      } else {
        setStatusCode(500);
        setStatusMsg(ERROR_500);
      }
    }
  }

  useEffect(() => {
    handlePersonalRecipeClick();
  }, [id]);

  return (
    <div>
      {statusCode === 200 ? 
        (
          <PersonalRecipePage
            id={recipe.id}
            title={recipe.title}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            imageURL={recipe.imageURL}
          />
        ) : (
          <ApiErrorPage statusCode={statusCode} statusMsg={statusMsg} />
        )
      }
    </div>
  );
};

export default GetPersonalRecipe;
