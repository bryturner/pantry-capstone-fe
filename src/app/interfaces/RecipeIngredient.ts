import { Ingredient } from './Ingredient';

export interface RecipeIngredient {
  id: number | null;
  amountNeeded: number;
  ingredient: Ingredient;
}
