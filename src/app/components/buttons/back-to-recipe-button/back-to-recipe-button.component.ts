import { Component, Input } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { Recipe } from 'src/app/interfaces/Recipe';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-back-to-recipe-button',
  templateUrl: './back-to-recipe-button.component.html',
  styleUrls: ['./back-to-recipe-button.component.css'],
})
export class BackToRecipeButtonComponent {
  @Input() recipe?: Recipe;
  public Pages = Pages;

  constructor(public ui: UiService) {}
}
