export interface RecipeProps {
  label: string;
  image: string;
  ingredients: Ingredient[];
  url: string;
}
export interface Ingredient {
  text: string;
}
