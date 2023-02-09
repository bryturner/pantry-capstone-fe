import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdjustAmountDTO } from 'src/app/dtos/AdjustAmountDTO';
import { Ingredient } from 'src/app/interfaces/Ingredient';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-ingredient-amount',
  templateUrl: './add-ingredient-amount.component.html',
  styleUrls: ['./add-ingredient-amount.component.css'],
})
export class AddIngredientAmountComponent {
  public amountToAdd: number | null = null;
  public adjustAmountDTOS: AdjustAmountDTO[] = [];

  @Input() ingredient?: Ingredient;
  @Output() addOpen = new EventEmitter<boolean>();

  constructor(public ui: UiService) {}

  public addAmountClick(
    ingredientId: number | undefined,
    amountToAdd: number | null
  ): void {
    if (amountToAdd === null || !ingredientId) return;

    const adjustAmountDTO: AdjustAmountDTO = {
      ingredientId: ingredientId,
      amountToAdjust: amountToAdd,
      isAddingAmount: true,
    };

    const adjustAmountDTOS: AdjustAmountDTO[] = [adjustAmountDTO];
    this.ui.addToPantryIngredientAmount(adjustAmountDTOS);
    this.addOpen.emit(false);
  }

  public cancelClick(): void {
    this.addOpen.emit(false);
  }
}
