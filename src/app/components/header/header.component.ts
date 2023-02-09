import { Component } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { AppUser } from 'src/app/interfaces/AppUser';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public Pages = Pages;

  constructor(public ui: UiService) {}
}
