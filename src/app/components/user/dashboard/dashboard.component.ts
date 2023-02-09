import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pages } from 'src/app/enums/PageEnum';
import { AppUserNoPass } from 'src/app/interfaces/AppUserNoPass';
import { Ingredient } from 'src/app/interfaces/Ingredient';
import { Recipe } from 'src/app/interfaces/Recipe';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {
  @ViewChild('ingredientsList', { static: true })
  public ingredientsList?: ElementRef;

  public Pages = Pages;
  public ingredients: Ingredient[];
  public recipes: Recipe[];
  public filterIngredientName: string = '';
  public filterRecipeName: string = '';
  public selectedUser: AppUserNoPass | string = 'All user recipes';

  private ingredientSubscription: Subscription;
  private recipeSubscription: Subscription;

  constructor(public ui: UiService) {
    this.ingredients = ui.getIngredients();
    this.ingredientSubscription = ui
      .ingredientsUpdate()
      .subscribe((ingredients) => (this.ingredients = ingredients));

    this.recipes = ui.getRecipes();
    this.recipeSubscription = ui
      .recipesUpdate()
      .subscribe((recipes) => (this.recipes = recipes));
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
    this.recipeSubscription.unsubscribe();
  }

  public scrollIngredientsList(distance: number): void {
    if (!this.ingredientsList) return;
    this.ingredientsList.nativeElement.scrollBy({
      top: distance,
      behavior: 'smooth',
    });
  }
}
