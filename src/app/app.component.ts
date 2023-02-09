import { Component } from '@angular/core';
import { Pages } from './enums/PageEnum';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public Pages = Pages;
  constructor(public ui: UiService) {}
}
