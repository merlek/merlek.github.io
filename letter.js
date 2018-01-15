var Letter = function() {
  var letterEnum = {};
  var values = {};

  var letter = function (spec) {
    var that = {};

    that.name = spec.name;
    that.hebrew = spec.hebrew;
    that.transliteration = spec.transliteration || null;
    that.endVowel = spec.endVowel || false;
    that.vowelType = spec.vowelType || null;

    that.isSymbol = function() {
      return that.name == "ShewaSilent"
        || that.name == "Accent"
        || that.name == "Meteg"
        || that.name == "Maqqef"
        || that.name == "Dagesh"
        || that.name == "ShinDot"
        || that.name == "SinDot"
        || that.name == "SyllableMarker";
    }
  
    that.isConstonant = function() {
      return !that.isSymbol() && that.vowelType == null && !that.endVowel;
    }

    that.isVowel = function() {
      return !that.isSymbol() && (that.vowelType != null || that.endVowel);
    }

    return that;
  }

  values.Alef = letter({
    name: "Alef",
    hebrew: "א",
    transliteration:"ʾ"
  });
  values.BetDagesh = letter({
    name: "BetDagesh",
    hebrew: "בּ",
    transliteration:"b"
  });
  values.Bet = letter({
    name: "Bet",
    hebrew: "ב",
    transliteration:"ḇ"
  });
  values.GimelDagesh = letter({
    name: "GimelDagesh",
    hebrew: "גּ",
    transliteration:"g"
  });
  values.Gimel = letter({
    name: "Gimel",
    hebrew: "ג",
    transliteration:"ḡ"
  });
  values.DaletDagesh = letter({
    name: "DaletDagesh",
    hebrew: "דּ",
    transliteration:"d"
  });
  values.Dalet = letter({
    name: "Dalet",
    hebrew: "ד",
    transliteration:"ḏ"
  });
  values.He = letter({
    name: "He",
    hebrew: "ה",
    transliteration:"h"
  });
  values.HeMappiq = letter({
    name: "HeMappiq",
    hebrew: "הּ",
    transliteration:"h"
  });
  values.Waw = letter({
    name: "Waw",
    hebrew: "ו",
    transliteration:"w"
  });
  values.Zayin = letter({
    name: "Zayin",
    hebrew: "ז",
    transliteration:"z"
  });
  values.Ḥet = letter({
    name: "Ḥet",
    hebrew: "ח",
    transliteration:"ḥ"
  });
  values.Tet = letter({
    name: "Tet",
    hebrew: "ט",
    transliteration:"ṭ"
  });
  values.Yod = letter({
    name: "Yod",
    hebrew: "י",
    transliteration:"y"
  });
  values.KafDagesh = letter({
    name: "KafDagesh",
    hebrew:"כּ",
    transliteration:"k"
  });
  values.Kaf = letter({
    name: "Kaf",
    hebrew: "כ",
    transliteration: "ḵ"
  });
  values.KafFinal = letter({
    name: "KafFinal",
    hebrew: "ך",
    transliteration: "ḵ"
  });
  values.Lamed = letter({
    name: "Lamed",
    hebrew: "ל",
    transliteration: "l"
  });
  values.Mem = letter({
    name: "Mem",
    hebrew: "מ",
    transliteration: "m"
  });
  values.MemFinal = letter({
    name: "MemFinal",
    hebrew: "ם",
    transliteration: "m"
  });
  values.Nun = letter({
    name: "Nun",
    hebrew: "נ",
    transliteration: "n"
  });
  values.NunFinal = letter({
    name: "NunFinal",
    hebrew: "ן",
    transliteration: "n"
  });
  values.Samek = letter({
    name: "Samek",
    hebrew: "ס",
    transliteration: "s"
  });
  values.Ayin = letter({
    name: "Ayin",
    hebrew: "ע",
    transliteration: "ʿ"
  });
  values.PeDagesh = letter({
    name: "PeDagesh",
    hebrew: "פּ",
    transliteration: "p"
  });
  values.Pe = letter({
    name: "Pe",
    hebrew: "פ",
    transliteration: "p̄"
  });
  values.PeFinal = letter({
    name: "PeFinal",
    hebrew: "ף",
    transliteration: "p̄"
  });
  values.Tsade = letter({
    name: "Tsade",
    hebrew: "צ",
    transliteration: "ṣ"
  });
  values.TsadeFinal = letter({
    name: "TsadeFinal",
    hebrew: "ץ",
    transliteration: "ṣ"
  });
  values.Qof = letter({
    name: "Qof",
    hebrew: "ק",
    transliteration: "q"
  });
  values.Resh = letter({
    name: "Resh",
    hebrew: "ר",
    transliteration: "r"
  });
  values.ShinDotless = letter({
    name: "ShinDotless",
    hebrew: "ש"
  });
  values.Sin = letter({
    name: "Sin",
    hebrew: "שׂ",
    transliteration: "ś"
  });
  values.Sin2 = letter({
    name: "Sin2",
    hebrew: "שׂ",
    transliteration: "ś"
  });
  values.Shin = letter({
    name: "Shin",
    hebrew: "שׁ",
    transliteration: "š"
  });
  values.Shin2 = letter({
    name: "Shin2",
    hebrew: "שׁ",
    transliteration: "š"
  });
  values.TawDagesh = letter({
    name: "TawDagesh",
    hebrew: "תּ",
    transliteration: "t"
  });
  values.Taw = letter({
    name: "Taw",
    hebrew: "ת",
    transliteration: "ṯ"
  });

  // === Vowels ===
  values.Qamets = letter({
    name: "Qamets",
    hebrew: "ָ",
    transliteration: "ā",
    vowelType: "long"
  });
  values.QametsHe = letter({
    name: "QametsHe",
    hebrew: "ָה",
    transliteration: "â",
    endVowel: true
  });
  values.Pathach = letter({
    name: "Pathach",
    hebrew: "ַ",
    transliteration: "a",
    vowelType: "short"
  });
  values.HatephPathach = letter({
    name: "HatephPathach",
    hebrew: "ֲ",
    transliteration: "ǎ",
    vowelType: "reduced"
  });
  values.Tsere = letter({
    name: "Tsere",
    hebrew: "ֵ",
    transliteration: "ē",
    vowelType: "long"
  });
  values.TsereHe = letter({
    name: "TsereHe",
    hebrew: "ֵה",
    transliteration: "ê",
    endVowel: true
  });
  values.TsereYod = letter({
    name: "TsereYod",
    hebrew: "ֵי",
    transliteration: "ê",
    vowelType: "long"
  });
  values.Seghol = letter({
    name: "Seghol",
    hebrew: "ֶ",
    transliteration: "e",
    vowelType: "short"
  });
  values.HatephSeghol = letter({
    name: "HatephSeghol",
    hebrew: "ֱ",
    transliteration: "ě",
    vowelType: "reduced"
  });
  values.SegholHe = letter({
    name: "SegholHe",
    hebrew: "ֶה",
    transliteration: "ê",
    endVowel: true
  });
  values.SegholYod = letter({
    name: "SegholYod",
    hebrew: "ֶי",
    transliteration: "ê",
    vowelType: "long"
  });
  values.Hireq = letter({
    name: "Hireq",
    hebrew: "ִ",
    transliteration: "i",
    vowelType: "short"
  });
  values.HireqYod = letter({
    name: "HireqYod",
    hebrew: "ִי",
    transliteration: "î",
    vowelType: "short"
  });
  values.Holem = letter({
    name: "Holem",
    hebrew: "ֹ",
    transliteration: "ō",
    vowelType: "long"
  });
  values.QametsHatuf = letter({
    name: "QametsHatuf",
    hebrew: "ָ",
    transliteration: "o",
    vowelType: "short"
  });
  values.HatephQamets = letter({
    name: "HatephQamets",
    hebrew: "ֳ",
    transliteration: "ŏ",
    vowelType: "reduced"
  });
  values.HolemHe = letter({
    name: "HolemHe",
    hebrew: "ֹה",
    transliteration: "ô",
    endVowel: true
  });
  values.HolemWaw = letter({
    name: "HolemWaw",
    hebrew: "וֹ",
    transliteration: "ô",
    vowelType: "long"
  });
  values.Qibbuts = letter({
    name: "Qibbuts",
    hebrew: "ֻ",
    transliteration: "u",
    vowelType: "short"
  });
  values.Shureq = letter({
    name: "Shureq",
    hebrew: "וּ",
    transliteration: "û",
    vowelType: "short"
  });

  // === Punctuation / Misc. ===
  values.Shewa = letter({
    name: "Shewa",
    hebrew: "ְ",
    transliteration: "ə",
    vowelType: "reduced"
  });
  values.ShewaSilent = letter({
    name: "ShewaSilent",
    hebrew: "ְ",
    transliteration: ""
  });
  values.Accent = letter({
    name: "Accent",
    hebrew: "֫",
    transliteration: ""
  });
  values.Meteg = letter({
    name: "Meteg",
    hebrew: "ֽ",
    transliteration: ""
  });
  values.Maqqef = letter({
    name: "Maqqef",
    hebrew: "־",
    transliteration: "-"
  });
  values.Dagesh = letter({
    name: "Dagesh",
    hebrew: "ּ"
  });
  values.ShinDot = letter({
    name: "ShinDot",
    hebrew: "ׁ"
  });
  values.SinDot = letter({
    name: "SinDot",
    hebrew: "ׂ"
  });

  values.SyllableMarker = letter({
    name: "SyllableMarker",
    hebrew: "",
    transliteration: "-"
  });

  values.NULL = letter({
    name: "NULL"
  });


  letterEnum.parse = function(allowEnglish, hebrew, endWord) {
    for (prop in values) {
      var letterValue = values[prop];
      if (hebrew == (letterValue.hebrew)) {
        if (!letterValue.endVowel || letterValue.endVowel && endWord) {
          return letterValue;
        } else {
          break;
        }
      }
    }

    if (allowEnglish){
      return letter({
        name: hebrew,
        hebrew: hebrew,
        transliteration: hebrew
      });
    } else {
      return Letter.values.NULL;
    }
  }
  
  letterEnum.values = values;
  return letterEnum;
}();
