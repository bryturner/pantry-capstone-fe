import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdjustAmountDTO } from 'src/app/dtos/AdjustAmountDTO';
import { Pages } from 'src/app/enums/PageEnum';
import { calculateCalories } from 'src/app/helpers/helpers';
import { Recipe } from 'src/app/interfaces/Recipe';
import { RecipeIngredient } from 'src/app/interfaces/RecipeIngredient';
import { UiService } from 'src/app/services/ui.service';
import { RecipeShortDialogComponent } from '../../dialogs/recipe-short-dialog/recipe-short-dialog.component';

export interface ShortIngredient {
  ingredientName: string;
  amountShort: number;
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  public recipe?: Recipe;
  public Pages = Pages;
  public totalCalories: number = 0;
  public totalTime: number | undefined;

  constructor(public ui: UiService, private dialog: MatDialog) {
    this.recipe = ui.getCurrentRecipe();
    if (!this.recipe) {
      ui.navigateToPage(Pages.Dashboard);
      return;
    }
  }

  ngOnInit(): void {
    if (!this.recipe) return;

    this.totalCalories = this.recipe.recipeIngredients
      .map((recipeIngredient) => {
        return calculateCalories(
          recipeIngredient.ingredient.calories,
          recipeIngredient.amountNeeded
        );
      })
      .reduce((acc, cur) => acc + cur);

    this.totalTime = this.recipe.prepTime + this.recipe.cookTime;
  }

  public openDialog(shortIngredients: RecipeIngredient[]): void {
    const dialogRef = this.dialog.open(RecipeShortDialogComponent, {
      data: { shortIngredients: shortIngredients },
    });
  }

  public useRecipeClick(recipeIngredients: RecipeIngredient[] | undefined) {
    if (!recipeIngredients) return;

    const shortIngredients: RecipeIngredient[] = recipeIngredients.filter(
      (recipeIngredient) => {
        return (
          recipeIngredient.amountNeeded > recipeIngredient.ingredient.amount
        );
      }
    );

    if (shortIngredients.length > 0) {
      this.openDialog(shortIngredients);
      return;
    }

    const adjustAmountDTOS: AdjustAmountDTO[] = recipeIngredients.map(
      (recipeIngredient) => {
        const adjustAmountDTO: AdjustAmountDTO = {
          ingredientId: recipeIngredient.ingredient.id,
          amountToAdjust: recipeIngredient.amountNeeded,
          isAddingAmount: false,
        };
        return adjustAmountDTO;
      }
    );

    this.ui.adjustIngredientAmounts(adjustAmountDTOS);
  }
}
