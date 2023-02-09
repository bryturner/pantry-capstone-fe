import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalToFraction',
})
export class DecimalToFractionPipe implements PipeTransform {
  transform(value: number | undefined, decimalPlaces: number = 3): string {
    if (value === 0) return '0';
    if (!value) return '';
    if (value % 1 === 0) return value.toString();

    let roundedValue = Number(value.toFixed(decimalPlaces));
    let numerator = roundedValue * Math.pow(10, decimalPlaces);
    let denominator = Math.pow(10, decimalPlaces);
    let gcd = this.gcd(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;

    if (numerator >= denominator) {
      let wholeNum = Math.floor(numerator / denominator);
      numerator = numerator % denominator;
      return wholeNum + ' ' + numerator + '/' + denominator;
    }

    return numerator + '/' + denominator;
  }

  private gcd(a: number, b: number): number {
    if (!b) {
      return a;
    }
    return this.gcd(b, a % b);
  }
}
