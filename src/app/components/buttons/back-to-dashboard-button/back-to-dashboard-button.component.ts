import { Component } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-back-to-dashboard-button',
  templateUrl: './back-to-dashboard-button.component.html',
  styleUrls: ['./back-to-dashboard-button.component.css'],
})
export class BackToDashboardButtonComponent {
  public Pages = Pages;
  constructor(public ui: UiService) {}

  public backClick(): void {
    const currentRecipe = this.ui.getCurrentRecipe();
    if (currentRecipe) {
      if (currentRecipe.recipeIngredients.length === 0) {
        this.ui.showError('You must have at least one ingredient');
        return;
      }

      if (currentRecipe.instructions.length === 0) {
        this.ui.showError('You must have at least one instruction step');
        return;
      }
    }

    this.ui.setCurrentRecipeToUndefined();
    this.ui.navigateToPage(Pages.Dashboard);
  }
}
