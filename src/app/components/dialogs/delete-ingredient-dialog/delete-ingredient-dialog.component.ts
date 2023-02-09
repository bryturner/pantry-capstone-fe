import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient } from 'src/app/interfaces/Ingredient';
import { Recipe } from 'src/app/interfaces/Recipe';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-delete-ingredient-dialog',
  templateUrl: './delete-ingredient-dialog.component.html',
  styleUrls: ['./delete-ingredient-dialog.component.css'],
})
export class DeleteIngredientDialogComponent {
  public recipes: Recipe[] = [];
  public ingredient?: Ingredient;

  constructor(
    public ui: UiService,
    public dialogRef: MatDialogRef<DeleteIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recipes = data.recipesWithIngredient;
    this.ingredient = data.ingredient;
  }

  public onClick(): void {
    this.dialogRef.close();
  }
}
