import { Component, OnDestroy } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  public username: string = '';
  public password: string = '';
  public verifyPassword: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public Pages = Pages;

  constructor(public ui: UiService) {}

  public registerClick(
    username: string,
    passowrd: string,
    firstName: string,
    lastName: string
  ): void {
    if (!username || !passowrd || !firstName || !lastName) return;

    this.ui.register(username, passowrd, firstName, lastName);
  }

  ngOnDestroy(): void {
    this.username = '';
    this.password = '';
    this.verifyPassword = '';
    this.firstName = '';
    this.lastName = '';
  }
}
