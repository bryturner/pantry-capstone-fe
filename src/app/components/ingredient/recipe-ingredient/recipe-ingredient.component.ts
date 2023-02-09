import { Component, Input } from '@angular/core';
import { RecipeIngredient } from 'src/app/interfaces/RecipeIngredient';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css'],
})
export class RecipeIngredientComponent {
  @Input() recipeIngredient!: RecipeIngredient;
  public checked: boolean = false;

  constructor(public ui: UiService) {}
}
