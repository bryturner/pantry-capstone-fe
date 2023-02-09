import { Pipe, PipeTransform } from '@angular/core';
import { AppUserNoPass } from '../interfaces/AppUserNoPass';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'filterRecipeByUser',
})
export class FilterRecipeByUserPipe implements PipeTransform {
  transform(
    recipes: Recipe[] | undefined,
    appUser: AppUserNoPass | string
  ): Recipe[] {
    if (!recipes) return [];
    if (!appUser || typeof appUser === 'string') return recipes;
    return recipes.filter((recipe) => {
      return recipe.appUserId === appUser.id;
    });
  }
}
