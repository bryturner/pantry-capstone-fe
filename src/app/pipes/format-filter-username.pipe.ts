import { Pipe, PipeTransform } from '@angular/core';
import { AppUserNoPass } from '../interfaces/AppUserNoPass';

@Pipe({
  name: 'formatFilterUsername',
})
export class FormatFilterUsernamePipe implements PipeTransform {
  transform(appUser: AppUserNoPass, currentUserId: number | undefined): string {
    if (!currentUserId) return appUser.username;
    if (appUser.id === currentUserId) return 'Your recipes';
    return appUser.username;
  }
}
