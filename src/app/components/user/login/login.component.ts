import { Component, OnDestroy } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  public username: string = '';
  public password: string = '';
  public Pages = Pages;

  constructor(public ui: UiService) {}

  ngOnDestroy(): void {
    this.username = '';
    this.password = '';
  }
}
