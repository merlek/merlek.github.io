import {Injectable} from '@angular/core';
import {Letter} from './letters';

@Injectable()
export class LetterService {

  constructor() {}

  parse(allowEnglish: boolean, hebrew: string, endWord?: boolean): Letter {

    for (let i = 0; i < Letter.values.length; i++) {
      const letterValue = Letter.values[i];
      if (hebrew === letterValue.hebrew) {
        if (!letterValue.endVowel || letterValue.endVowel && endWord) {
          return letterValue;
        } else {
          break;
        }
      }
    }

    if (allowEnglish) {
      return new Letter({
        name: hebrew,
        hebrew: hebrew,
        transliteration: hebrew
      });
    } else {
      return Letter.NULL;
    }
  }

}
