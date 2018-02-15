import {PipeTransform, Pipe, Injectable} from '@angular/core';
import {SearchLogic} from '../search-list/search-list.component'

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

  transform(values: any[], filter: string, filterLogic?: SearchLogic, ignore?: string[]): any[] {
    if (values == null) {
      return [];
    }
    if (filter){
      let filters = filter.toLocaleLowerCase().split(/\s+/g);
      if (filterLogic && filterLogic.logicalOperator === "OR") {
        let fV = [];
        filters.forEach(f => fV = fV.concat(
            values.filter(v => Filter._match(v, f, ignore))));
        values = fV;
      } else  {
        filters.forEach(f => values = values.filter(v => Filter._match(v, f, ignore)));
      }  
    }

    return values;
  }

}
