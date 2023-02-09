import { Component } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-create-recipe-button',
  templateUrl: './create-recipe-button.component.html',
  styleUrls: ['./create-recipe-button.component.css'],
})
export class CreateRecipeButtonComponent {
  public Pages = Pages;

  constructor(public ui: UiService) {}
}
