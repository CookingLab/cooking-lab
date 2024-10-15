import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import { RecipeProps } from './interfaces/recipeInterface';


const ApiApp = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  
  const getRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${query}`);
      console.log(response.data);
      setRecipes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]); // Set recipes to an empty array if the API call fails
    }
  };

  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getSearched = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <>
      <form onSubmit={getSearched}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div>
        {recipes.map(recipe => (
          <Recipe key={recipe.label} label={recipe.label} image={recipe.image} ingredients={recipe.ingredients} />
          // <div key={recipe.label}>
          //   <h2>{recipe.label}</h2>
          //   <img src={recipe.image} alt={recipe.label} />
          //   <p>{recipe.ingredients.join(', ')}</p>
          // </div>
        ))}
      </div>
    </>
  );
};

export default ApiApp;