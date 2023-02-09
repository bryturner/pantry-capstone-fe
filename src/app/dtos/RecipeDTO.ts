import { RecipeIngredientDTO } from './RecipeIngredientDTO';

export interface RecipeDTO {
  id: number | null;
  recipeName: string;
  recipeImage: string;
  instructions: string;
  appUserId: number;
  prepTime: number;
  cookTime: number;
  recipeDescription: string;
  recipeIngredients: RecipeIngredientDTO[];
}
