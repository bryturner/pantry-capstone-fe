import { Component, Input } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { Recipe } from 'src/app/interfaces/Recipe';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent {
  @Input() recipe?: Recipe;

  constructor(public ui: UiService) {}
}
