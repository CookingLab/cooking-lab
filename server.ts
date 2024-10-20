import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/recipes', async (req, res) => {
  const { diet, health, cuisineType, mealType } = req.query;

  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&cuisineType=${cuisineType}&mealType=${mealType}`;

  if (diet && (typeof diet === 'string' || Array.isArray(diet)) && diet.length > 0) {
    const dietParams = Array.isArray(diet) ? diet.join('&diet=') : diet;
    url += `&diet=${dietParams}`;
  }

  if (health && (typeof health === 'string' || Array.isArray(health)) && health.length > 0) {
    const healthParams = Array.isArray(health) ? health.join('&health=') : health;
    url += `&health=${healthParams}`;
  }

  try {
    const response = await axios.get(url);
    const recipes = response.data.hits.map((hit: { recipe: any; }) => hit.recipe);
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = recipes[randomIndex];
      console.log('randomRecipe:', randomRecipe);
      res.json(randomRecipe);
    } else {
      res.status(404).json({ error: 'No recipes found' });
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
