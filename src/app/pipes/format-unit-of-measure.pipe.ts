import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUnitOfMeasure',
})
export class FormatUnitOfMeasurePipe implements PipeTransform {
  transform(
    value: string | undefined,
    type: string = 'plural',
    ingoName: string = ''
  ): string {
    if (value === 'n/a' && type === 'n/a') return 'n/a';
    if (type === 'singular') {
      if (value === 'g') return 'gram';
      if (value === 'tbsp') return 'tablespoon';
      if (value === 'tsp') return 'teaspoon';
      if (value === 'ml') return 'milliliter';
      if (value === 'n/a' && ingoName.length === 0) return '';
      if (value === 'n/a' && ingoName.length > 0) return ingoName.toLowerCase();
    }

    if (value === 'g') return 'grams';
    if (value === 'tbsp') return 'tablespoons';
    if (value === 'tsp') return 'teaspoons';
    if (value === 'ml') return 'milliliters';
    if (value === 'n/a' && ingoName.length === 0) return '';
    if (value === 'n/a' && ingoName.length > 0)
      return `${ingoName.toLowerCase()}(s)`;

    return 'units';
  }
}
