import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/recipes/:query', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
    );
    const recipes = response.data.hits.map((hit: { recipe: any; }) => hit.recipe);
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});