var Transliterate = function(){
  var that = {};
  
  var DEBUG = false;
  that.SYLLABIFY = false;
  
  that.transliterateList = function (words) {
    
    var transliteratedTerms = [];

    for (var i in words) {
      var word = words[i];
      var tWord = that.transliterateWord(word);
      transliteratedTerms.push(tWord);
    }

    
    for (var j in transliteratedTerms) {
      if (DEBUG) console.log(transliteratedTerms[j]);
    }
    return transliteratedTerms;
  }
  
  that.transliterateWord = function(hebrewWord) {
    if (DEBUG) console.log("transliterateWord: " + hebrewWord);
    
    var list = [];
    
    for (var i = 0; i < hebrewWord.length; i++) {
      list.push(Letter.parse(true, hebrewWord[i]));
    }
    
    if (DEBUG) console.log(list);
    
    list = simplify(list);
    list = simplify2(list);
    list = syllabify(list);
    return transliterate(list);
  }
  
  var simplify = function(list) {
    if (DEBUG) { console.log("==SIMPLIFY=="); printList(list)}
    
    var newList = [];
    var last = list[0];
    
    for (var i = 1; i < list.length; i++) {
      if (DEBUG) { console.log(i + ") newList: "); printList(newList); }
      
      var letter = list[i];
      
      if (DEBUG) { 
        console.log("last: "+last.name);
        console.log("letter-"+i+": "+letter.name);
      }
      
      var combo = last.hebrew + letter.hebrew;
      var newLetter = Letter.parse(false, combo, i >= list.length - 1);
      
      if (DEBUG) console.log("newLetter: " + newLetter.name);
      
      if (newLetter != Letter.values.NULL) {
        if (newLetter == Letter.values.HolemWaw && newList.length > 1 && newList[newList.length - 1] == Letter.values.Shewa) {
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
  
  var simplify2 = function (list) {
    if (DEBUG) { console.log("==SIMPLIFY2=="); printList(list)}
    
    var newList = [];
    
    for (var i = 0; i < list.length; i++) {
      if (DEBUG) { console.log(i + ") newList: "); printList(newList); }
      var letter = list[i];
      if (DEBUG) console.log("letter-"+i+": " + letter.name);
      
      if (letter == Letter.values.Shewa &&
          (newList.length > 2 && "short" == (newList[newList.length - 2].vowelType) || (i >= list.length - 1 && newList.length > 1))) {
        // check for Silent Shewa
        letter = Letter.values.ShewaSilent;
      } else if (letter == Letter.values.Dagesh) {
        // Dagesh Forte
        letter = newList[newList.length - 1];
        if (letter == Letter.values.Alef || letter == Letter.values.Ayin || letter == Letter.values.He || letter == Letter.values.Ḥet) {
          // guttural rejects
          letter = Letter.values.NULL;
        }
      } else if ((letter == Letter.values.BetDagesh || letter == Letter.values.GimelDagesh || letter == Letter.values.DaletDagesh || letter == Letter.values.KafDagesh || letter == Letter.values.PeDagesh || letter == Letter.values.TawDagesh)
        && newList.length > 1 && newList[newList.length - 1].isVowel()
        && newList[newList.length - 1] != Letter.values.Shewa) {
        // Dagesh Forte
        newList.push(letter);
      }
      
      if (i >= list.length - 1 && letter == Letter.values.Pathach) {
        // check for Furtive Pathach
        var previousLetter = newList[newList.length - 1];
        if (previousLetter == Letter.values.Ḥet || previousLetter == Letter.values.Ayin || previousLetter == Letter.values.HeMappiq) {
          // Furtive Pathach !
          newList.pop();
          newList.push(letter,previousLetter);
          letter = Letter.values.NULL;
        }
      }
      
      if (letter && letter != Letter.values.NULL && letter.transliteration)
        newList.push(letter);
    }
    
    return newList;
  }
  
  var syllabify = function(list) {
    if (DEBUG) { console.log("==SYLLABIFY=="); printList(list); }

    var newList = [];

    for (var i = 0; i < list.length; i++) {
      if (DEBUG) { console.log(i + ") newList: "); printList(newList); }

      var letter = list[i];

      if (DEBUG) console.log("letter-" + i + ": " + letter.name);

      if (letter.isConstonant() && newList.length > 0 && i < list.length - 1) {
        var next = list[++i];
        if (DEBUG) console.log("next-" + i + ": " + next.name);

        if (next.isConstonant()) {
          if (i < list.length - 1) {
            newList.push(letter);
            newList.push(Letter.values.SyllableMarker);
            newList.push(next);
          } else {
            newList.push(letter);
            newList.push(next);
          }
        } else {
          newList.push(Letter.values.SyllableMarker);
          newList.push(letter);
          newList.push(next);
        }
      } else {
        newList.push(letter);
      }

    }

    return newList;
  }
  
  var transliterate = function (list) {
    if (DEBUG) console.log("SYLLABIFY=" + that.SYLLABIFY);

    var word = "";

    for (var i = 0; i < list.length; i++) {
      var letter = list[i];

      if (that.SYLLABIFY || letter != Letter.values.SyllableMarker) {
        if (DEBUG) console.log(letter.name + " -> \"" + letter.transliteration + "\"");
        word += letter.transliteration;
      }
    }
    return word;
  }

  var printList = function (list) {
    var text = "";
    for (var i = 0; i < list.length; i++) {
        text += list[i].name + ", ";
    }
    console.log(text);
  }
  
  return that;
}();
