import { Component } from '@angular/core';
import { Pages } from 'src/app/enums/PageEnum';
import { AppUser } from 'src/app/interfaces/AppUser';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-app-user',
  templateUrl: './edit-app-user.component.html',
  styleUrls: ['./edit-app-user.component.css'],
})
export class EditAppUserComponent {
  public Pages = Pages;
  public currentAppUser?: AppUser;
  public username: string = '';
  public currentPassword: string = '';
  public newPassword: string = '';
  public verifyNewPassword: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public changePassword: boolean = false;
  public showPasswordIncorrectError: boolean = false;

  constructor(public ui: UiService) {
    this.currentAppUser = ui.getCurrentUser();
    if (!this.currentAppUser) {
      ui.navigateToPage(Pages.Dashboard);
      return;
    }

    this.username = this.currentAppUser.username;
    this.firstName = this.currentAppUser.firstName;
    this.lastName = this.currentAppUser.lastName;
  }

  public saveClick(
    username: string,
    firstName: string,
    lastName: string,
    currentPassword: string,
    newPassword: string,
    verifyNewPassword: string
  ) {
    if (!username || !firstName || !lastName || !this.currentAppUser) return;

    if (!this.changePassword) {
      const password = this.currentAppUser.password;
      this.ui.updateAppUser(username, password, firstName, lastName);
    }

    if (this.changePassword) {
      const passwordIsCorrect = this.ui.checkPasswordIsCorrect(currentPassword);

      if (!passwordIsCorrect) {
        this.showPasswordIncorrectError = true;
        return;
      } else {
        this.showPasswordIncorrectError = false;
        if (newPassword !== verifyNewPassword) return;
        this.ui.updateAppUser(username, newPassword, firstName, lastName);
      }
    }
  }
}
