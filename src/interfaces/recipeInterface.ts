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
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  text: string;
}
