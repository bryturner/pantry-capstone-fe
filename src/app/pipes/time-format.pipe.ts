import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(minutes: number | undefined): string {
    if (!minutes) return 'n/a';
    
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hour${hours > 1 ? 's' : ''} ${
        remainingMinutes > 0 ? `and ${remainingMinutes} minutes` : ''
      }`;
    } else {
      return `${minutes} minutes`;
    }
  }
}
