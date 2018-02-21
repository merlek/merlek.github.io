﻿import {PipeTransform, Pipe, Injectable} from '@angular/core';
import {SearchLogic} from '../search-list/search-list.component'
import {SearchMatch} from '../search-list/search-list.component'
import {SearchEvent} from '../search-list/search-list.component'


@Pipe({
  name: 'filter'
})
@Injectable()
export class Filter implements PipeTransform {

  static _normalize(value: any): any {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value
        .replace(/<[^>]+>/gm, '')
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,' ')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
    } else {
      return value;
    }
  }

  static _match(value: any, filter: string, exact?:boolean, ignore?: string[]): boolean {
    for (const prop in value) {
      if (value.hasOwnProperty(prop) && value[prop] != null) {
        if (!ignore || !ignore.includes(prop)) {
          if (typeof value[prop] === 'string' && Filter._normalize(value[prop]).indexOf(filter) !== -1) {
            if(!exact) {
              return true;
            } else {
              let words = Filter._normalize(value[prop]).split(/\s+/g);
              for (var word of words) {
                if(word === filter) {
                  return true;
                }
              }
//            console.log('match', prop, value[prop], filter);
            }
          } else if (typeof value[prop] === 'number' && value[prop] === +filter) {
//            console.log('match', prop, value[prop], filter);
            return true;
          } else if (typeof value[prop] === 'object' && Filter._match(value[prop], filter, exact, ignore)) {
//            console.log('match', prop, value[prop], filter);
            return true;
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
    if (search && search.search){
      let filters = search.search
                            .toLocaleLowerCase().split(/\s+/g)
                            .map(f => Filter._normalize(f));
      let exact = search.match === SearchMatch.EXACT;
      let logic = search.logic;
      if (logic && logic === SearchLogic.OR) {
        let fV = [];
        filters.forEach(f => fV = fV.concat(
            values.filter(v => Filter._match(v, f, exact, ignore))));
        values = fV;
      } else  {
        filters.forEach(f => values = values.filter(v => Filter._match(v, f, exact, ignore)));
      }  
    }

    return values;
  }

}
