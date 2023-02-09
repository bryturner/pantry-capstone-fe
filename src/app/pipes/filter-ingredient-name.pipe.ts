import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../interfaces/Ingredient';

@Pipe({
  name: 'filterIngredientName',
})
export class FilterIngredientNamePipe implements PipeTransform {
  transform(
    ingredients: Ingredient[] | undefined,
    ingredientName: string
  ): any {
    if (!ingredients) return [];
    if (!ingredientName) return ingredients;
    const lcIngredientName = ingredientName.toLowerCase();
    return ingredients.filter((ingredient) => {
      return ingredient.ingredientName.toLowerCase().includes(lcIngredientName);
    });
  }
}
