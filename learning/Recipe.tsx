import { RecipeProps } from '../src/interfaces/recipeInterface';
import React from 'react';

const Recipe = ({label, image, ingredients}: RecipeProps) => {
  return (
    <div>
      <h1>{label}</h1>
      <img src={image} alt={label} />
      <ul>
        {ingredients?.map(ingredient => (
          <li key={ingredient.text}>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default Recipe;
