import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderby'})

export class OrderBy implements PipeTransform {

  static notAlpha = /[^\u00BF-\u1FFF\u2C00-\uD7FF\w]/g;
  static notNum = /[^\d]/g;

  value: string[] = [];

  static _normalize(value: any): any {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } else {
      return value;
    }
  }

  static _sortAlphaNum(a: any, b: any): number {
    const aString = OrderBy._normalize(a);
    const bString = OrderBy._normalize(b);

    const aInt = parseInt(aString, 10);
    const bInt = parseInt(bString, 10);

    if (isNaN(aInt) && isNaN(bInt)) {
      // neither are Integers
      const aAlpha = aString.replace(OrderBy.notAlpha, '');
      const bAlpha = bString.replace(OrderBy.notAlpha, '');

      if (aAlpha === bAlpha) {
        const aNum = parseInt(aString.replace(OrderBy.notNum, ''), 10);
        const bNum = parseInt(bString.replace(OrderBy.notNum, ''), 10);
        return aNum === bNum ? 0 : aNum > bNum ? 1 : -1;
      } else {
        return aAlpha > bAlpha ? 1 : -1;
      }
    } else if (isNaN(aInt)) {// A is not an Int
      return 1; // to make alphanumeric sort first return -1 here
    } else if (isNaN(bInt)) {// B is not an Int
      return -1; // to make alphanumeric sort first return 1 here
    } else {
      return aInt > bInt ? 1 : -1;
    }
  }

  static _orderByComparator(a: any, b: any): number {
    if (typeof a === 'object') {
      a = JSON.stringify(a);
    }
    if (typeof b === 'object') {
      b = JSON.stringify(b);
    }

    if (a === null || typeof a === 'undefined') {
      a = 0;
    }
    if (b === null || typeof b === 'undefined') {
      b = 0;
    }
    return OrderBy._sortAlphaNum(a, b);
  }

  transform(input: any, config: string = '+'): any {
    if (input == null) {
      return;
    }
    // make a copy of the input's reference
    this.value = [...input];
    const value = this.value;

    if (!Array.isArray(value)) {
      return value;
    }

    if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
      const propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      const desc = propertyToCheck.substr(0, 1) === '-';

      // Basic array
      if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
        return !desc ? value.sort() : value.sort().reverse();
      } else {
        const property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
          ? propertyToCheck.substr(1)
          : propertyToCheck;

        return value.sort(function(a: any, b: any) {
          return !desc
            ? OrderBy._orderByComparator(a[property], b[property])
            : -OrderBy._orderByComparator(a[property], b[property]);
        });
      }
    } else {
      // Loop over property of the array in order and sort
      return value.sort(function(a: any, b: any) {
        for (let i = 0; i < config.length; i++) {
          const desc = config[i].substr(0, 1) === '-';
          const property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
            ? config[i].substr(1)
            : config[i];

          const comparison = !desc
            ? OrderBy._orderByComparator(a[property], b[property])
            : -OrderBy._orderByComparator(a[property], b[property]);

          // Don't return 0 yet in case of needing to sort by next property
          if (comparison !== 0) {
            return comparison;
          }
        }

        return 0; // equal each other
      });
    }
  }
}
