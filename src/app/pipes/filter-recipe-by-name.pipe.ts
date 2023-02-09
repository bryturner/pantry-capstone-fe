import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'filterRecipeByName',
})
export class FilterRecipeByNamePipe implements PipeTransform {
  transform(recipes: Recipe[] | undefined, recipeName: string): Recipe[] {
    if (!recipes) return [];
    if (!recipeName) return recipes;
    const lcRecipeName = recipeName.toLowerCase();
    return recipes.filter((recipe) => {
      return recipe.recipeName.toLowerCase().includes(lcRecipeName);
    });
  }
}
