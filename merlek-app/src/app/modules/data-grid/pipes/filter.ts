import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { SearchLogic } from '../components/search-list/search-list.component';
import { SearchMatch } from '../components/search-list/search-list.component';
import { SearchEvent } from '../components/search-list/search-list.component';

@Pipe({
  name: 'filter'
})
@Injectable()
export class Filter implements PipeTransform {
  static _normalize(value: any): any {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value
        .replace(/<[^>]+>/gm, ' ') // replace with space so that words are matched correctly
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, ' ')
        .replace(/[-]/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
    } else {
      return value;
    }
  }

  static _match(
    value: any,
    filter: string,
    exact?: boolean,
    ignore?: string[]
  ): boolean {
    if (filter) {
      for (const prop in value) {
        if (value.hasOwnProperty(prop) && value[prop] != null) {
          if (!ignore || !ignore.includes(prop)) {
            if (typeof value[prop] === 'string') {
              const normalizedValue = Filter._normalize(value[prop]);

              if (normalizedValue.indexOf(filter) !== -1) {
                if (exact) {
                  for (const word of normalizedValue.split(/\s+/g)) {
                    if (word === filter) {
                      return true;
                    }
                  }
                } else {
                  return true;
                }
              }
            } else if (
              typeof value[prop] === 'number' &&
              value[prop] === +filter
            ) {
              return true;
            } else if (
              typeof value[prop] === 'object' &&
              Filter._match(value[prop], filter, exact, ignore)
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  transform(values: any[], search: SearchEvent, ignore?: string[]): any[] {
    if (values == null) {
      return [];
    }
    if (search && search.search) {
      const filters = search.search
        .toLocaleLowerCase()
        .split(/\s+/g)
        .map(f => Filter._normalize(f));
      const exact = search.match === SearchMatch.EXACT;
      const logic = search.logic;
      if (logic && logic === SearchLogic.OR) {
        let fV = [];
        filters.forEach(
          f =>
            (fV = fV.concat(
              values.filter(v => Filter._match(v, f, exact, ignore))
            ))
        );
        values = fV;
      } else {
        filters.forEach(
          f => (values = values.filter(v => Filter._match(v, f, exact, ignore)))
        );
      }
    }

    return values;
  }
}
