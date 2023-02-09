import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/interfaces/Ingredient';
import { RecipeIngredient } from 'src/app/interfaces/RecipeIngredient';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-recipe-ingredient-form-el',
  templateUrl: './recipe-ingredient-form-el.component.html',
  styleUrls: ['./recipe-ingredient-form-el.component.css'],
})
export class RecipeIngredientFormElComponent implements OnDestroy, OnInit {
  @Input() recipeIngredients: RecipeIngredient[] = [];
  @Output() recipeIngredientsData = new EventEmitter<any>();
  @ViewChild('amountInput') amountInput: ElementRef;

  public ingredients: Ingredient[];
  private ingredientsSubscription: Subscription;
  public selectedIngredient?: Ingredient;
  public amountNeeded: number | null = null;

  public calculatedCalories: number = 0;

  constructor(public ui: UiService, private el: ElementRef) {
    this.ingredients = ui.getIngredients().map((i) => i);
    this.ingredientsSubscription = ui
      .ingredientsUpdate()
      .subscribe((ingredients) => (this.ingredients = ingredients));

    this.amountInput = el;
  }

  ngOnInit(): void {
    if (this.recipeIngredients.length > 0) {
      const filteredIngredients = this.ingredients.filter(
        (ingredient) =>
          !this.recipeIngredients.some(
            (recipeIngredient) =>
              recipeIngredient.ingredient.id === ingredient.id
          )
      );

      this.ingredients = filteredIngredients;
    }
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  public dropIngredient(event: CdkDragDrop<RecipeIngredient[]>): void {
    moveItemInArray(
      this.recipeIngredients,
      event.previousIndex,
      event.currentIndex
    );

    this.recipeIngredientsData.emit(this.recipeIngredients);
  }

  public editIngredient(index: number): void {
    const [selectedRecipeIngredient] = this.recipeIngredients.splice(index, 1);
    this.recipeIngredientsData.emit(this.recipeIngredients);
    this.ingredients.push(selectedRecipeIngredient.ingredient);
    this.selectedIngredient = selectedRecipeIngredient.ingredient;
    this.amountNeeded = selectedRecipeIngredient.amountNeeded;
    this.amountInput.nativeElement.focus();
  }

  public addIngredient(
    ingredient: Ingredient | undefined,
    amountNeeded: number | null
  ): void {
    if (!ingredient || !amountNeeded || amountNeeded < 0) return;

    const ingredientIndex = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(ingredientIndex, 1);

    const recipeIngredient: RecipeIngredient = {
      id: null,
      amountNeeded: amountNeeded,
      ingredient: ingredient,
    };

    this.recipeIngredients.push(recipeIngredient);
    this.recipeIngredientsData.emit(this.recipeIngredients);

    this.selectedIngredient = undefined;
    this.amountNeeded = null;
  }

  public removeRecipeIngredient(index: number): void {
    const [removedIngredient] = this.recipeIngredients.splice(index, 1);
    this.ingredients.push(removedIngredient.ingredient);
    this.recipeIngredientsData.emit(this.recipeIngredients);
  }
}
