
export class Letter {

  name: string;
  hebrew: string;
  transliteration: string;
  endVowel: boolean;
  vowelType: string;

  constructor(spec) { 
    this.name = spec.name;
    this.hebrew = spec.hebrew;
    this.transliteration = spec.transliteration || null;
    this.endVowel = spec.endVowel || false;
    this.vowelType = spec.vowelType || null;
  }

  isSymbol(): boolean {
    return this.name == "ShewaSilent"
      || this.name == "Accent"
      || this.name == "Meteg"
      || this.name == "Maqqef"
      || this.name == "Dagesh"
      || this.name == "ShinDot"
      || this.name == "SinDot"
      || this.name == "SyllableMarker";
  }
  
  isConstonant(): boolean {
    return !this.isSymbol() && this.vowelType == null && !this.endVowel;
  }

  isVowel(): boolean {
    return !this.isSymbol() && (this.vowelType != null || this.endVowel);
  }

}

export const LETTERS = {
  Alef : new Letter({ name: "Alef", hebrew: "א", transliteration:"ʾ" }),
  BetDagesh : new Letter({ name: "BetDagesh", hebrew: "בּ", transliteration:"b" }),
  BetDagesh2 : new Letter({ name: "BetDagesh", hebrew: "בּ", transliteration:"b" }),
  Bet : new Letter({ name: "Bet", hebrew: "ב", transliteration:"ḇ" }),
  GimelDagesh : new Letter({ name: "GimelDagesh", hebrew: "גּ", transliteration:"g" }),
  Gimel : new Letter({ name: "Gimel", hebrew: "ג", transliteration:"ḡ" }),
  DaletDagesh : new Letter({ name: "DaletDagesh", hebrew: "דּ", transliteration:"d" }),
  Dalet : new Letter({ name: "Dalet", hebrew: "ד", transliteration:"ḏ" }),
  He : new Letter({ name: "He", hebrew: "ה", transliteration:"h" }),
  HeMappiq : new Letter({ name: "HeMappiq", hebrew: "הּ", transliteration:"h" }),
  Waw : new Letter({ name: "Waw", hebrew: "ו", transliteration:"w" }),
  Zayin : new Letter({ name: "Zayin", hebrew: "ז", transliteration:"z" }),
  Ḥet : new Letter({ name: "Ḥet", hebrew: "ח", transliteration:"ḥ" }),
  Tet : new Letter({ name: "Tet", hebrew: "ט", transliteration:"ṭ" }),
  Yod : new Letter({ name: "Yod", hebrew: "י", transliteration:"y" }),
  KafDagesh : new Letter({ name: "KafDagesh", hebrew:"כּ", transliteration:"k" }),
  Kaf : new Letter({ name: "Kaf", hebrew: "כ", transliteration: "ḵ" }),
  KafFinal : new Letter({ name: "KafFinal", hebrew: "ך", transliteration: "ḵ" }),
  Lamed : new Letter({ name: "Lamed", hebrew: "ל", transliteration: "l" }),
  Mem : new Letter({ name: "Mem", hebrew: "מ", transliteration: "m" }),
  MemFinal : new Letter({ name: "MemFinal", hebrew: "ם", transliteration: "m" }),
  Nun : new Letter({ name: "Nun", hebrew: "נ", transliteration: "n" }),
  NunFinal : new Letter({ name: "NunFinal", hebrew: "ן", transliteration: "n" }),
  Samek : new Letter({ name: "Samek", hebrew: "ס", transliteration: "s" }),
  Ayin : new Letter({ name: "Ayin", hebrew: "ע", transliteration: "ʿ" }),
  PeDagesh : new Letter({ name: "PeDagesh", hebrew: "פּ", transliteration: "p" }),
  Pe : new Letter({ name: "Pe", hebrew: "פ", transliteration: "p̄" }),
  PeFinal : new Letter({ name: "PeFinal", hebrew: "ף", transliteration: "p̄" }),
  Tsade : new Letter({ name: "Tsade", hebrew: "צ", transliteration: "ṣ" }),
  TsadeFinal : new Letter({ name: "TsadeFinal", hebrew: "ץ", transliteration: "ṣ" }),
  Qof : new Letter({ name: "Qof", hebrew: "ק", transliteration: "q" }),
  Resh : new Letter({ name: "Resh", hebrew: "ר", transliteration: "r" }),
  ShinDotless : new Letter({ name: "ShinDotless", hebrew: "ש" }),
  Sin : new Letter({ name: "Sin", hebrew: "שׂ", transliteration: "ś" }),
  Sin2 : new Letter({ name: "Sin2", hebrew: "שׂ", transliteration: "ś" }),
  Shin : new Letter({ name: "Shin", hebrew: "שׁ", transliteration: "š" }),
  Shin2 : new Letter({ name: "Shin2", hebrew: "שׁ", transliteration: "š" }),
  TawDagesh : new Letter({ name: "TawDagesh", hebrew: "תּ", transliteration: "t" }),
  TawDagesh2 : new Letter({ name: "TawDagesh", hebrew: "תּ", transliteration: "t" }),
  Taw : new Letter({ name: "Taw", hebrew: "ת", transliteration: "ṯ" }),

  // === Vowels ===
  Qamets : new Letter({ name: "Qamets", hebrew: "ָ", transliteration: "ā", vowelType: "long" }),
  QametsHe : new Letter({ name: "QametsHe", hebrew: "ָה", transliteration: "â", endVowel: true }),
  Pathach : new Letter({ name: "Pathach", hebrew: "ַ", transliteration: "a", vowelType: "short" }),
  HatephPathach : new Letter({ name: "HatephPathach", hebrew: "ֲ", transliteration: "ǎ", vowelType: "reduced" }),
  Tsere : new Letter({ name: "Tsere", hebrew: "ֵ", transliteration: "ē", vowelType: "long" }),
  TsereHe : new Letter({ name: "TsereHe", hebrew: "ֵה", transliteration: "ê", endVowel: true }),
  TsereYod : new Letter({ name: "TsereYod", hebrew: "ֵי", transliteration: "ê", vowelType: "long" }),
  Seghol : new Letter({ name: "Seghol", hebrew: "ֶ", transliteration: "e", vowelType: "short" }),
  HatephSeghol : new Letter({ name: "HatephSeghol", hebrew: "ֱ", transliteration: "ě", vowelType: "reduced" }),
  SegholHe : new Letter({ name: "SegholHe", hebrew: "ֶה", transliteration: "ê", endVowel: true }),
  SegholYod : new Letter({ name: "SegholYod", hebrew: "ֶי", transliteration: "ê", vowelType: "long" }),
  Hireq : new Letter({ name: "Hireq", hebrew: "ִ", transliteration: "i", vowelType: "short" }),
  HireqYod : new Letter({ name: "HireqYod", hebrew: "ִי", transliteration: "î", vowelType: "short" }),
  Holem : new Letter({ name: "Holem", hebrew: "ֹ", transliteration: "ō", vowelType: "long" }),
  QametsHatuf : new Letter({ name: "QametsHatuf", hebrew: "ָ", transliteration: "o", vowelType: "short" }),
  HatephQamets : new Letter({ name: "HatephQamets", hebrew: "ֳ", transliteration: "ŏ", vowelType: "reduced" }),
  HolemHe : new Letter({ name: "HolemHe", hebrew: "ֹה", transliteration: "ô", endVowel: true }),
  HolemWaw : new Letter({ name: "HolemWaw", hebrew: "וֹ", transliteration: "ô", vowelType: "long" }),
  Qibbuts : new Letter({ name: "Qibbuts", hebrew: "ֻ", transliteration: "u", vowelType: "short" }),
  Shureq : new Letter({ name: "Shureq", hebrew: "וּ", transliteration: "û", vowelType: "short" }),

  // === Punctuation / Misc. ===
  Shewa : new Letter({ name: "Shewa", hebrew: "ְ", transliteration: "ə", vowelType: "reduced" }),
  ShewaSilent : new Letter({ name: "ShewaSilent", hebrew: "ְ", transliteration: "" }),
  Accent : new Letter({ name: "Accent", hebrew: "֫", transliteration: "" }),
  Meteg : new Letter({ name: "Meteg", hebrew: "ֽ", transliteration: "" }),
  Maqqef : new Letter({ name: "Maqqef", hebrew: "־", transliteration: "-" }),
  Dagesh : new Letter({ name: "Dagesh", hebrew: "ּ" }),
  ShinDot : new Letter({ name: "ShinDot", hebrew: "ׁ" }),
  SinDot : new Letter({ name: "SinDot", hebrew: "ׂ" }),

  SyllableMarker : new Letter({ name: "SyllableMarker", hebrew: "", transliteration: "-" }),

  NULL : new Letter({ name: "NULL" })
};