import { Injectable } from '@angular/core';

import { LetterService } from './letter.service';
import { Letter } from './letters';
import { LETTERS } from './letters';

@Injectable()
export class TransliteratorService {

  DEBUG = false;
  SYLLABIFY = false;

	constructor(private letterService: LetterService) { }
  
  transliterateList (words: string[]) : string[] {
    
    var transliteratedTerms = [];

    for (var i in words) {
      var word = words[i];
      var tWord = this.transliterateWord(word);
      transliteratedTerms.push(tWord);
    }

    for (var j in transliteratedTerms) {
      if (this.DEBUG) console.log(transliteratedTerms[j]);
    }

    return transliteratedTerms;
  }
  
  transliterateWord (hebrewWord: string) {
    if (this.DEBUG) console.log("transliterateWord: " + hebrewWord);
    
    var list = [];
    
    for (var i = 0; i < hebrewWord.length; i++) {
      list.push(this.letterService.parse(true, hebrewWord[i]));
    }
    
    if (this.DEBUG) console.log(list);
    
    list = this.reorder(list);
    list = this.simplify(list);
    list = this.simplify2(list);
    list = this.syllabify(list);
    return this.transliterate(list);
  }

  private reorder(list: Letter[]) : Letter[] {
    if (this.DEBUG) { console.log("==REORDER=="); console.log(this.textList(list)); }
    
    var newList = [];
    var last = list[0];
    
    for (var i = 1; i < list.length; i++) {
      if (this.DEBUG) { console.log(i + ") newList: "+this.textList(newList)); }
      
      var letter = list[i];
      
      if (this.DEBUG) { 
        console.log("last: "+last.name);
        console.log("letter-"+i+": "+letter.name);
      }
      
      if ((letter == LETTERS.SinDot || letter == LETTERS.ShinDot)
       && last != LETTERS.ShinDotless) {
        var t = letter;
        letter = last;
        last = t;
      }

      if (letter == LETTERS.ShinDot && last != LETTERS.ShinDotless) {
        letter = last;
        last = LETTERS.SinDot;
      }

      if (letter == LETTERS.Dagesh && last.isVowel()) {
        letter = last;
        last = LETTERS.Dagesh;
      }

      newList.push(last);
      last = letter;
    }
    
    newList.push(last);
    return newList;
  }
  
  private simplify(list: Letter[]) : Letter[] {
    if (this.DEBUG) { console.log("==SIMPLIFY=="); console.log(this.textList(list)); }
    
    var newList = [];
    var last = list[0];
    
    for (var i = 1; i < list.length; i++) {
      if (this.DEBUG) { console.log(i + ") newList: "+this.textList(newList)); }
      
      var letter = list[i];
      
      if (this.DEBUG) { 
        console.log("last: "+last.name);
        console.log("letter-"+i+": "+letter.name);
      }
      
      var combo = last.hebrew + letter.hebrew;
      var newLetter = this.letterService.parse(false, combo, i >= list.length - 1);
      
      if (this.DEBUG) console.log("newLetter: " + newLetter.name);
      
      if (newLetter != LETTERS.NULL) {
        if (newLetter == LETTERS.HolemWaw && newList.length > 1 && newList[newList.length - 1] == LETTERS.Shewa) {
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
  
  private simplify2(list: Letter[]) : Letter[] {
    if (this.DEBUG) { console.log("==SIMPLIFY2=="); console.log(this.textList(list)); }
    
    var newList = [];
    
    for (var i = 0; i < list.length; i++) {
      if (this.DEBUG) { console.log(i + ") newList: "+ this.textList(newList)); }
      var letter = list[i];
      if (this.DEBUG) console.log("letter-"+i+": " + letter.name);
      
      if (letter == LETTERS.Shewa &&
          (newList.length > 2 && "short" == (newList[newList.length - 2].vowelType)
           || (i >= list.length - 1 && newList.length > 1))) {
        // check for Silent Shewa
        letter = LETTERS.ShewaSilent;
      } else if (letter == LETTERS.Dagesh) {
        // Dagesh Forte
        letter = newList[newList.length - 1];
        if (letter == LETTERS.Alef || letter == LETTERS.Ayin || letter == LETTERS.He || letter == LETTERS.Ḥet) {
          // guttural rejects
          letter = LETTERS.NULL;
        }
      } else if ((letter == LETTERS.BetDagesh || letter == LETTERS.GimelDagesh || letter == LETTERS.DaletDagesh
      						 || letter == LETTERS.KafDagesh || letter == LETTERS.PeDagesh || letter == LETTERS.TawDagesh)
        && newList.length > 1 && newList[newList.length - 1].isVowel()
        && newList[newList.length - 1] != LETTERS.Shewa) {
        // Dagesh Forte
        newList.push(letter);
      }
      
      if (i >= list.length - 1 && letter == LETTERS.Pathach) {
        // check for Furtive Pathach
        var previousLetter = newList[newList.length - 1];
        if (previousLetter == LETTERS.Ḥet || previousLetter == LETTERS.Ayin || previousLetter == LETTERS.HeMappiq) {
          // Furtive Pathach !
          newList.pop();
          newList.push(letter,previousLetter);
          letter = LETTERS.NULL;
        }
      }
      
      if (letter && letter != LETTERS.NULL && letter.transliteration)
        newList.push(letter);
    }
    
    return newList;
  }
  
  private syllabify(list: Letter[]): Letter[] {
    if (this.DEBUG) { console.log("==SYLLABIFY=="); console.log(this.textList(list)); }

    var newList = [];

    for (var i = 0; i < list.length; i++) {
      if (this.DEBUG) { console.log(i + ") newList: "+this.textList(newList)); }

      var letter = list[i];

      if (this.DEBUG) console.log("letter-" + i + ": " + letter.name);

      if (letter.isConstonant() && newList.length > 0 && i < list.length - 1) {
        var next = list[++i];
        if (this.DEBUG) console.log("next-" + i + ": " + next.name);

        if (next.isConstonant()) {
          if (i < list.length - 1) {
            newList.push(letter);
            newList.push(LETTERS.SyllableMarker);
            newList.push(next);
          } else {
            newList.push(letter);
            newList.push(next);
          }
        } else {
          newList.push(LETTERS.SyllableMarker);
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
    if (this.DEBUG) console.log("SYLLABIFY=" + this.SYLLABIFY);

    var word = "";

    for (var i = 0; i < list.length; i++) {
      var letter = list[i];

      if (this.SYLLABIFY || letter != LETTERS.SyllableMarker) {
        if (this.DEBUG) console.log(letter.name + " -> \"" + letter.transliteration + "\"");
        word += letter.transliteration;
      }
    }

    return word;
  }

  textList(list: Letter[]): string {   
    return list.map( l => l ? l.name : '' ).join(", ");
  }

}
