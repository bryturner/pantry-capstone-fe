import { RecipeIngredient } from './RecipeIngredient';

export interface Recipe {
  id: number;
  recipeName: string;
  recipeImage: string;
  instructions: string[];
  appUserId: number;
  appUserFullName: string
  prepTime: number;
  cookTime: number;
  recipeDescription: string;
  recipeIngredients: RecipeIngredient[];
}
