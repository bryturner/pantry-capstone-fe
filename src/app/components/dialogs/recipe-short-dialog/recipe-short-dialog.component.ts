import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeIngredient } from 'src/app/interfaces/RecipeIngredient';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-recipe-short-dialog',
  templateUrl: './recipe-short-dialog.component.html',
  styleUrls: ['./recipe-short-dialog.component.css'],
})
export class RecipeShortDialogComponent {
  public recipeIngredients: RecipeIngredient[] = [];

  constructor(
    public ui: UiService,
    public dialogRef: MatDialogRef<RecipeShortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recipeIngredients = data.shortIngredients;
  }

  public shortAmount(recipeIngredient: RecipeIngredient): number {
    return recipeIngredient.amountNeeded - recipeIngredient.ingredient.amount;
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
