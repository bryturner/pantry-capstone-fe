import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDTO } from 'src/app/dtos/IngredientDTO';
import { UiService } from 'src/app/services/ui.service';
import { IngredientDialogComponent } from '../../dialogs/ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-new-ingredient-button',
  templateUrl: './new-ingredient-button.component.html',
  styleUrls: ['./new-ingredient-button.component.css'],
})
export class NewIngredientButtonComponent {
  constructor(public ui: UiService, public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const { ingredientName, ingredientImage, uom, amount, calories } = result;

      const newIngredient: IngredientDTO = {
        id: null,
        ingredientName: ingredientName,
        ingredientImage: ingredientImage,
        uom: uom,
        amount: amount,
        calories: calories,
      };

      this.ui.createIngredient(newIngredient);
    });
  }
}
