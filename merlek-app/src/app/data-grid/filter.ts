import {PipeTransform, Pipe, Injectable} from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class Filter implements PipeTransform {

  static _normalize(value: any): any {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } else {
      return value;
    }
  }

  static _match(value: any, filter: string, ignore?: string[]): boolean {
    for (const prop in value) {
      if (value.hasOwnProperty(prop) && value[prop] != null) {
        if (!ignore || !ignore.includes(prop)) {
          if (typeof value[prop] === 'string' && Filter._normalize(value[prop]).toLocaleLowerCase().indexOf(filter) !== -1) {
//            console.log('match', prop, value[prop], filter);
            return true;
          } else if (typeof value[prop] === 'number' && value[prop] === +filter) {
//            console.log('match', prop, value[prop], filter);
            return true;
          } else if (typeof value[prop] === 'object' && Filter._match(value[prop], filter)) {
//            console.log('match', prop, value[prop], filter);
            return true;
          }
        }
      }
    }
    return false;
  }

  transform(value: any[], filter: string, ignore?: string[]): any[] {
    if (value == null) {
      return [];
    }

    if (filter) {
      filter.toLocaleLowerCase().split(/\s+/g)
        .forEach(f => value = value.filter(v => Filter._match(v, f, ignore)));
    } else {
      return value;
    }

    return value;
  }

}
