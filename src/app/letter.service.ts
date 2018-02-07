import { Injectable } from '@angular/core';

import { Letter } from './letters';
import { LETTERS } from './letters';

@Injectable()
export class LetterService {

  constructor() { }

  parse (allowEnglish: boolean, hebrew: string, endWord?: boolean): Letter {
    for (var prop in LETTERS) {
      var letterValue = LETTERS[prop];
      if (hebrew === letterValue.hebrew) {
        if (!letterValue.endVowel || letterValue.endVowel && endWord) {
          return letterValue;
        } else {
          break;
        }
      }
    }

    if (allowEnglish){
      return new Letter({
        name: hebrew,
        hebrew: hebrew,
        transliteration: hebrew
      });
    } else {
      return LETTERS.NULL;
    }
  }
  
}
