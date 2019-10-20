import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderby'})

export class OrderBy implements PipeTransform {

  static collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

  value: string[] = [];

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

    if (typeof a === 'number' && typeof b === 'number') {
      return a === b ? 0 : a > b ? 1 : -1;
    } else if (typeof a === 'number') {
      a = String(a);
    } else if (typeof b === 'number') {
      b = String(b);
    }

    return this.collator.compare(a, b);
  }

  transform(input: any, config: string[] | string  = '+'): any {
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
