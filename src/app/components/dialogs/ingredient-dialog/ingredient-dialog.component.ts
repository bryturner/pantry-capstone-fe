import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UOM_OPTIONS } from 'src/app/data/constants';
import { formatString } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-new-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.css'],
})
export class IngredientDialogComponent {
  public ingredientName: string = '';
  public ingredientImage: string = '';
  public uom?: string;
  public amount: number | null = null;
  public calories: number | null = null;
  public uomOptions: string[] = UOM_OPTIONS;
  public isNewIngredient = true;

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!data) return;

    this.isNewIngredient = false;
    this.ingredientName = data.ingredientName;
    this.ingredientImage = data.ingredientImage;
    this.uom = data.uom;
    this.amount = data.amount;
    this.calories = data.calories;
  }

  public onSubmitClick(
    ingredientName: string,
    ingredientImage: string,
    uom: string | undefined,
    amount: number | null,
    calories: number | null
  ): void {
    const formattedIngredientName = formatString(ingredientName);

    if (
      !formattedIngredientName ||
      !ingredientImage ||
      !amount ||
      !calories ||
      calories < 0 ||
      amount < 0 ||
      !uom
    ) {
      return;
    }

    this.dialogRef.close({
      ingredientName: ingredientName,
      ingredientImage: ingredientImage,
      uom: uom,
      amount: amount,
      calories: calories,
    });
  }

  public resetClick(): void {
    this.ingredientName = this.data.ingredientName;
    this.ingredientImage = this.data.ingredientImage;
    this.uom = this.data.uom;
    this.amount = this.data.amount;
    this.calories = this.data.calories;
  }

  public onCancelClick(): void {
    // this.isNewIngredient = true
    this.dialogRef.close();
  }
}
