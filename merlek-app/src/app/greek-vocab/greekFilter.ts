import {PipeTransform, Pipe, Injectable} from '@angular/core';
import {GreekVocab} from './greekVocab';

@Pipe({
  name: 'greekFilter'
})
@Injectable()
export class GreekFilterPipe implements PipeTransform {

  static _normalize(value: any): any {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } else {
      return value;
    }
  }

  static _greekMatch(app: GreekVocab, filter: string): boolean {
    return app.Greek != null && GreekFilterPipe._normalize(app.Greek).toLocaleLowerCase().indexOf(filter) !== -1
      || app.Declension != null && GreekFilterPipe._normalize(app.Declension).toLocaleLowerCase().indexOf(filter) !== -1
      || app.Article != null && GreekFilterPipe._normalize(app.Article).toLocaleLowerCase().indexOf(filter) !== -1
      || app.English != null && app.English.toLocaleLowerCase().indexOf(filter) !== -1
      || app.Note != null && app.Note.toLocaleLowerCase().indexOf(filter) !== -1
      || app.Transliteration != null && GreekFilterPipe._normalize(app.Transliteration).toLocaleLowerCase().indexOf(filter) !== -1
      || app.Type != null && app.Type.toLocaleLowerCase().indexOf(filter) !== -1
      || app.Frequency != null && app.Frequency === +filter
      || app.Tag != null && String(app.Tag).toLocaleLowerCase().indexOf(filter) !== -1;
  }

  transform(value: GreekVocab[], filter: string): GreekVocab[] {
    if (value == null) {
      return [];
    }

    if (filter) {
      filter.toLocaleLowerCase().split(/\s+/g)
        .forEach(f => value = value.filter((app: GreekVocab) => GreekFilterPipe._greekMatch(app, f)));
    } else {
      return value;
    }

    return value;
  }

}
