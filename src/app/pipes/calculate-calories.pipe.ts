import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateCalories',
})
export class CalculateCaloriesPipe implements PipeTransform {
  transform(amount: number, caloriesPerUnit: number): string {
    const calories = amount * caloriesPerUnit;
    if (calories < 1) return '< 1';
    return `${Math.floor(calories)}`;
  }
}
