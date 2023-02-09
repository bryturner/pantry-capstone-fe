import { Component, Input } from '@angular/core';
import { RecipeIngredientDTO } from 'src/app/dtos/RecipeIngredientDTO';
import { formatString } from 'src/app/helpers/helpers';
import { RecipeIngredient } from 'src/app/interfaces/RecipeIngredient';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-save-recipe-button',
  templateUrl: './save-recipe-button.component.html',
  styleUrls: ['./save-recipe-button.component.css'],
})
export class SaveRecipeButtonComponent {
  @Input() ingredientData?: any;

  constructor(public ui: UiService) {}

  public saveClick(ingredientData: any) {
    if (!ingredientData) return;

    const {
      id,
      recipeName,
      recipeImage,
      recipeDescription,
      prepTime,
      cookTime,
      recipeIngredients,
      instructions,
    } = ingredientData;

    if (
      prepTime === null ||
      prepTime < 0 ||
      cookTime === null ||
      cookTime < 0 ||
      recipeIngredients.length < 1 ||
      instructions.length < 1 ||
      recipeImage.length === 0
    )
      return;

    const formattedRecipeName: string = formatString(recipeName);
    const formattedRecipeDescription: string = formatString(recipeDescription);
    const instructionsString: string = instructions.join('&');
    if (
      formattedRecipeName.length === 0 ||
      formattedRecipeDescription.length === 0
    ) {
      return;
    }

    const recipeIngredientDTOS: RecipeIngredientDTO[] = recipeIngredients.map(
      (recipeIngredient: RecipeIngredient) => {
        const recipeIngredientDTO: RecipeIngredientDTO = {
          id: recipeIngredient.id,
          amountNeeded: recipeIngredient.amountNeeded,
          ingredientId: recipeIngredient.ingredient.id,
        };
        return recipeIngredientDTO;
      }
    );

    if (id === null) {
      this.ui.createRecipe(
        formattedRecipeName,
        recipeImage,
        instructionsString,
        prepTime,
        cookTime,
        formattedRecipeDescription,
        recipeIngredientDTOS
      );
    }

    if (id !== null) {
      this.ui.updateRecipe(
        id,
        formattedRecipeName,
        recipeImage,
        instructionsString,
        prepTime,
        cookTime,
        formattedRecipeDescription,
        recipeIngredientDTOS
      );
    }
  }
}
