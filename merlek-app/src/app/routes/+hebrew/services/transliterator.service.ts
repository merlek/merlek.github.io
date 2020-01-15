import { Injectable } from '@angular/core';

import { LetterService } from './letter.service';
import { Letter } from './letters';

@Injectable()
export class TransliteratorService {
  DEBUG = false;
  SYLLABIFY = false;

  constructor(private letterService: LetterService) {}

  transliterateList(words: string[]): string[] {
    const transliteratedTerms = words.map(word => this.transliterateWord(word));

    return transliteratedTerms;
  }

  transliterateWord(hebrewWord: string) {
    let list = [];

    for (let i = 0; i < hebrewWord.length; i++) {
      list.push(this.letterService.parse(true, hebrewWord[i]));
    }

    list = this.reorder(list);
    list = this.simplify(list);
    list = this.simplify2(list);
    list = this.syllabify(list);
    return this.transliterate(list);
  }

  private reorder(list: Letter[]): Letter[] {
    const newList = [];
    let last = list[0];

    for (let i = 1; i < list.length; i++) {
      let letter = list[i];

      if (
        (letter === Letter.SinDot || letter === Letter.ShinDot) &&
        last !== Letter.ShinDotless
      ) {
        const t = letter;
        letter = last;
        last = t;
      }

      if (letter === Letter.ShinDot && last !== Letter.ShinDotless) {
        letter = last;
        last = Letter.SinDot;
      }

      if (letter === Letter.Dagesh && last.isVowel()) {
        letter = last;
        last = Letter.Dagesh;
      }

      newList.push(last);
      last = letter;
    }

    newList.push(last);
    return newList;
  }

  private simplify(list: Letter[]): Letter[] {
    const newList = [];
    let last = list[0];

    for (let i = 1; i < list.length; i++) {
      const letter = list[i];

      const combo = last.hebrew + letter.hebrew;
      const newLetter = this.letterService.parse(
        false,
        combo,
        i >= list.length - 1 || list[i + 1].hebrew.match(/^\s+/) !== null
      );

      if (newLetter !== Letter.NULL) {
        if (
          newLetter === Letter.HolemWaw &&
          newList.length > 1 &&
          newList[newList.length - 1] === Letter.Shewa
        ) {
          newList.push(last);
          last = letter;
        } else {
          last = newLetter;
        }
      } else {
        newList.push(last);
        last = letter;
      }
    }

    newList.push(last);
    return newList;
  }

  private simplify2(list: Letter[]): Letter[] {
    const newList = [];

    for (let i = 0; i < list.length; i++) {
      let letter = list[i];

      if (
        letter === Letter.Shewa &&
        ((newList.length > 2 &&
          'short' === newList[newList.length - 2].vowelType) ||
          (i >= list.length - 1 && newList.length > 1))
      ) {
        // check for Silent Shewa
        letter = Letter.ShewaSilent;
      } else if (letter === Letter.Dagesh) {
        // Dagesh Forte
        letter = newList[newList.length - 1];
        if (
          letter === Letter.Alef ||
          letter === Letter.Ayin ||
          letter === Letter.He ||
          letter === Letter.Ḥet
        ) {
          // guttural rejects
          letter = Letter.NULL;
        }
      } else if (
        (letter === Letter.BetDagesh ||
          letter === Letter.GimelDagesh ||
          letter === Letter.DaletDagesh ||
          letter === Letter.KafDagesh ||
          letter === Letter.PeDagesh ||
          letter === Letter.TawDagesh) &&
        newList.length > 1 &&
        newList[newList.length - 1].isVowel() &&
        newList[newList.length - 1] !== Letter.Shewa
      ) {
        // Dagesh Forte
        newList.push(letter);
      }

      if (i >= list.length - 1 && letter === Letter.Pathach) {
        // check for Furtive Pathach
        const previousLetter = newList[newList.length - 1];
        if (
          previousLetter === Letter.Ḥet ||
          previousLetter === Letter.Ayin ||
          previousLetter === Letter.HeMappiq
        ) {
          // Furtive Pathach !
          newList.pop();
          newList.push(letter, previousLetter);
          letter = Letter.NULL;
        }
      }

      if (letter && letter !== Letter.NULL && letter.transliteration) {
        newList.push(letter);
      }
    }

    return newList;
  }

  private syllabify(list: Letter[]): Letter[] {
    const newList = [];

    for (let i = 0; i < list.length; i++) {
      const letter = list[i];

      if (letter.isConstonant() && newList.length > 0 && i < list.length - 1) {
        const next = list[++i];

        if (next.isConstonant()) {
          if (i < list.length - 1) {
            newList.push(letter);
            newList.push(Letter.SyllableMarker);
            newList.push(next);
          } else {
            newList.push(letter);
            newList.push(next);
          }
        } else {
          newList.push(Letter.SyllableMarker);
          newList.push(letter);
          newList.push(next);
        }
      } else {
        newList.push(letter);
      }
    }

    return newList;
  }

  private transliterate(list: Letter[]): string {
    let word = '';

    for (let i = 0; i < list.length; i++) {
      const letter = list[i];

      if (this.SYLLABIFY || letter !== Letter.SyllableMarker) {
        word += letter.transliteration;
      }
    }

    return word;
  }

  textList(list: Letter[]): string {
    return list.map(l => (l ? l.name : '')).join(', ');
  }
}
