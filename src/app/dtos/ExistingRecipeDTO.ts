import { RecipeIngredient } from '../interfaces/RecipeIngredient';

export interface ExistingRecipeDTO {
  id: number;
  recipeName: string;
  recipeImage: string;
  instructions: string;
  appUserId: number;
  appUserFullName: string;
  prepTime: number;
  cookTime: number;
  recipeDescription: string;
  recipeIngredients: RecipeIngredient[];
}
