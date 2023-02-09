import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDTO } from 'src/app/dtos/IngredientDTO';
import { Ingredient } from 'src/app/interfaces/Ingredient';
import { Recipe } from 'src/app/interfaces/Recipe';
import { UiService } from 'src/app/services/ui.service';
import { DeleteIngredientDialogComponent } from '../../dialogs/delete-ingredient-dialog/delete-ingredient-dialog.component';
import { IngredientDialogComponent } from '../../dialogs/ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.css'],
})
export class IngredientCardComponent {
  @Input() ingredient?: Ingredient;
  public addOpen: boolean = false;

  constructor(public ui: UiService, public dialog: MatDialog) {}

  public editClick(ingredient: Ingredient | undefined): void {
    if (!ingredient) return;

    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: {
        ingredientName: ingredient.ingredientName,
        ingredientImage: ingredient.ingredientImage,
        uom: ingredient.uom,
        amount: ingredient.amount,
        calories: ingredient.calories,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const { ingredientName, ingredientImage, uom, amount, calories } = result;

      const updatedIngredient: IngredientDTO = {
        id: ingredient.id,
        ingredientName: ingredientName,
        ingredientImage: ingredientImage,
        uom: uom,
        amount: amount,
        calories: calories,
      };

      this.ui.updateIngredient(updatedIngredient);
    });
  }

  public deleteClick(
    id: number | undefined,
    ingredient: Ingredient | undefined
  ): void {
    if (!id || !ingredient) return;

    const recipesWithIngredient: Recipe[] = this.ui
      .getRecipes()
      .filter((recipe) =>
        recipe.recipeIngredients.some(
          (recipeIngredient) => recipeIngredient.ingredient.id === id
        )
      );

    if (recipesWithIngredient.length > 0) {
      this.dialog.open(DeleteIngredientDialogComponent, {
        data: {
          recipesWithIngredient: recipesWithIngredient,
          ingredient: ingredient,
        },
      });
      return;
    }

    this.ui.deleteIngredient(id);
  }
}
