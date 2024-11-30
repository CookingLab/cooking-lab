export interface RecipeProps {
  label: string;
  image?: string;
  ingredients: Ingredient[];
  url?: string;
  instructions?: string[];
}

export interface PersonalRecipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  imageURL: string;
}

export interface Ingredient {
  text: string;
}

export interface ApiError {
  statusCode: number;
  statusMsg: string;
}