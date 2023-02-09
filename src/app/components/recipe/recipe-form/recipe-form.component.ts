import { Component, Input, OnDestroy } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { Recipe } from 'src/app/interfaces/Recipe';
import { RecipeIngredient } from 'src/app/interfaces/RecipeIngredient';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent {
  public recipeToEdit?: Recipe;
  public isNewRecipeForm: boolean = true;
  public Pages = Pages;
  public id: number | null = null;
  public recipeName: string = '';
  public recipeImage: string = '';
  public instructions: string[] = [];
  public recipeIngredients: RecipeIngredient[] = [];
  public cookTime: number | null = null;
  public prepTime: number | null = null;
  public recipeDescription: string = '';

  constructor(public ui: UiService) {
    this.recipeToEdit = this.ui.getCurrentRecipe();
    if (this.recipeToEdit) {
      this.isNewRecipeForm = false;
      this.id = this.recipeToEdit.id;
      this.recipeName = this.recipeToEdit.recipeName;
      this.recipeImage = this.recipeToEdit.recipeImage;
      this.instructions = this.recipeToEdit.instructions;
      this.prepTime = this.recipeToEdit.prepTime;
      this.cookTime = this.recipeToEdit.cookTime;
      this.recipeDescription = this.recipeToEdit.recipeDescription;
      this.recipeIngredients = this.recipeToEdit.recipeIngredients;
    }
  }
}
