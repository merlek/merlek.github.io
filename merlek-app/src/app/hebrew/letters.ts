
import {MetaProperty} from 'typescript';
export class Letter {

  public static Alef = new Letter({name: 'Alef', hebrew: 'א', transliteration: 'ʾ'});
  public static BetDagesh = new Letter({name: 'BetDagesh', hebrew: 'בּ', transliteration: 'b'});
  public static BetDagesh2 = new Letter({name: 'BetDagesh', hebrew: 'בּ', transliteration: 'b'});
  public static Bet = new Letter({name: 'Bet', hebrew: 'ב', transliteration: 'ḇ'});
  public static GimelDagesh = new Letter({name: 'GimelDagesh', hebrew: 'גּ', transliteration: 'g'});
  public static Gimel = new Letter({name: 'Gimel', hebrew: 'ג', transliteration: 'ḡ'});
  public static DaletDagesh = new Letter({name: 'DaletDagesh', hebrew: 'דּ', transliteration: 'd'});
  public static Dalet = new Letter({name: 'Dalet', hebrew: 'ד', transliteration: 'ḏ'});
  public static He = new Letter({name: 'He', hebrew: 'ה', transliteration: 'h'});
  public static HeMappiq = new Letter({name: 'HeMappiq', hebrew: 'הּ', transliteration: 'h'});
  public static Waw = new Letter({name: 'Waw', hebrew: 'ו', transliteration: 'w'});
  public static Zayin = new Letter({name: 'Zayin', hebrew: 'ז', transliteration: 'z'});
  public static Ḥet = new Letter({name: 'Ḥet', hebrew: 'ח', transliteration: 'ḥ'});
  public static Tet = new Letter({name: 'Tet', hebrew: 'ט', transliteration: 'ṭ'});
  public static Yod = new Letter({name: 'Yod', hebrew: 'י', transliteration: 'y'});
  public static KafDagesh = new Letter({name: 'KafDagesh', hebrew: 'כּ', transliteration: 'k'});
  public static Kaf = new Letter({name: 'Kaf', hebrew: 'כ', transliteration: 'ḵ'});
  public static KafFinal = new Letter({name: 'KafFinal', hebrew: 'ך', transliteration: 'ḵ'});
  public static Lamed = new Letter({name: 'Lamed', hebrew: 'ל', transliteration: 'l'});
  public static Mem = new Letter({name: 'Mem', hebrew: 'מ', transliteration: 'm'});
  public static MemFinal = new Letter({name: 'MemFinal', hebrew: 'ם', transliteration: 'm'});
  public static Nun = new Letter({name: 'Nun', hebrew: 'נ', transliteration: 'n'});
  public static NunFinal = new Letter({name: 'NunFinal', hebrew: 'ן', transliteration: 'n'});
  public static Samek = new Letter({name: 'Samek', hebrew: 'ס', transliteration: 's'});
  public static Ayin = new Letter({name: 'Ayin', hebrew: 'ע', transliteration: 'ʿ'});
  public static PeDagesh = new Letter({name: 'PeDagesh', hebrew: 'פּ', transliteration: 'p'});
  public static Pe = new Letter({name: 'Pe', hebrew: 'פ', transliteration: 'p̄'});
  public static PeFinal = new Letter({name: 'PeFinal', hebrew: 'ף', transliteration: 'p̄'});
  public static Tsade = new Letter({name: 'Tsade', hebrew: 'צ', transliteration: 'ṣ'});
  public static TsadeFinal = new Letter({name: 'TsadeFinal', hebrew: 'ץ', transliteration: 'ṣ'});
  public static Qof = new Letter({name: 'Qof', hebrew: 'ק', transliteration: 'q'});
  public static Resh = new Letter({name: 'Resh', hebrew: 'ר', transliteration: 'r'});
  public static ShinDotless = new Letter({name: 'ShinDotless', hebrew: 'ש'});
  public static Sin = new Letter({name: 'Sin', hebrew: 'שׂ', transliteration: 'ś'});
  public static Sin2 = new Letter({name: 'Sin2', hebrew: 'שׂ', transliteration: 'ś'});
  public static Shin = new Letter({name: 'Shin', hebrew: 'שׁ', transliteration: 'š'});
  public static Shin2 = new Letter({name: 'Shin2', hebrew: 'שׁ', transliteration: 'š'});
  public static TawDagesh = new Letter({name: 'TawDagesh', hebrew: 'תּ', transliteration: 't'});
  public static TawDagesh2 = new Letter({name: 'TawDagesh', hebrew: 'תּ', transliteration: 't'});
  public static Taw = new Letter({name: 'Taw', hebrew: 'ת', transliteration: 'ṯ'});

  // ==== Vowels ====
  public static Qamets = new Letter({name: 'Qamets', hebrew: 'ָ', transliteration: 'ā', vowelType: 'long'});
  public static QametsHe = new Letter({name: 'QametsHe', hebrew: 'ָה', transliteration: 'â', endVowel: true});
  public static Pathach = new Letter({name: 'Pathach', hebrew: 'ַ', transliteration: 'a', vowelType: 'short'});
  public static HatephPathach = new Letter({name: 'HatephPathach', hebrew: 'ֲ', transliteration: 'ǎ', vowelType: 'reduced'});
  public static Tsere = new Letter({name: 'Tsere', hebrew: 'ֵ', transliteration: 'ē', vowelType: 'long'});
  public static TsereHe = new Letter({name: 'TsereHe', hebrew: 'ֵה', transliteration: 'ê', endVowel: true});
  public static TsereYod = new Letter({name: 'TsereYod', hebrew: 'ֵי', transliteration: 'ê', vowelType: 'long'});
  public static Seghol = new Letter({name: 'Seghol', hebrew: 'ֶ', transliteration: 'e', vowelType: 'short'});
  public static HatephSeghol = new Letter({name: 'HatephSeghol', hebrew: 'ֱ', transliteration: 'ě', vowelType: 'reduced'});
  public static SegholHe = new Letter({name: 'SegholHe', hebrew: 'ֶה', transliteration: 'ê', endVowel: true});
  public static SegholYod = new Letter({name: 'SegholYod', hebrew: 'ֶי', transliteration: 'ê', vowelType: 'long'});
  public static Hireq = new Letter({name: 'Hireq', hebrew: 'ִ', transliteration: 'i', vowelType: 'short'});
  public static HireqYod = new Letter({name: 'HireqYod', hebrew: 'ִי', transliteration: 'î', vowelType: 'short'});
  public static Holem = new Letter({name: 'Holem', hebrew: 'ֹ', transliteration: 'ō', vowelType: 'long'});
  public static QametsHatuf = new Letter({name: 'QametsHatuf', hebrew: 'ָ', transliteration: 'o', vowelType: 'short'});
  public static HatephQamets = new Letter({name: 'HatephQamets', hebrew: 'ֳ', transliteration: 'ŏ', vowelType: 'reduced'});
  public static HolemHe = new Letter({name: 'HolemHe', hebrew: 'ֹה', transliteration: 'ô', endVowel: true});
  public static HolemWaw = new Letter({name: 'HolemWaw', hebrew: 'וֹ', transliteration: 'ô', vowelType: 'long'});
  public static Qibbuts = new Letter({name: 'Qibbuts', hebrew: 'ֻ', transliteration: 'u', vowelType: 'short'});
  public static Shureq = new Letter({name: 'Shureq', hebrew: 'וּ', transliteration: 'û', vowelType: 'short'});

  // ==== Punctuation / Misc. ====
  public static Shewa = new Letter({name: 'Shewa', hebrew: 'ְ', transliteration: 'ə', vowelType: 'reduced'});
  public static ShewaSilent = new Letter({name: 'ShewaSilent', hebrew: 'ְ', transliteration: ''});
  public static Accent = new Letter({name: 'Accent', hebrew: '֫', transliteration: ''});
  public static Meteg = new Letter({name: 'Meteg', hebrew: 'ֽ', transliteration: ''});
  public static Maqqef = new Letter({name: 'Maqqef', hebrew: '־', transliteration: '-'});
  public static Dagesh = new Letter({name: 'Dagesh', hebrew: 'ּ'});
  public static ShinDot = new Letter({name: 'ShinDot', hebrew: 'ׁ'});
  public static SinDot = new Letter({name: 'SinDot', hebrew: 'ׂ'});

  public static SyllableMarker = new Letter({name: 'SyllableMarker', hebrew: '', transliteration: '-'});

  public static NULL = new Letter({name: 'NULL'});

  public static values = [Letter.Alef, Letter.BetDagesh, Letter.BetDagesh2, Letter.Bet, Letter.GimelDagesh,
  Letter.Gimel, Letter.DaletDagesh, Letter.Dalet, Letter.He, Letter.HeMappiq, Letter.Waw, Letter.Zayin,
  Letter.Ḥet, Letter.Tet, Letter.Yod, Letter.KafDagesh, Letter.Kaf, Letter.KafFinal, Letter.Lamed, Letter.Mem,
  Letter.MemFinal, Letter.Nun, Letter.NunFinal, Letter.Samek, Letter.Ayin, Letter.PeDagesh, Letter.Pe,
  Letter.PeFinal, Letter.Tsade, Letter.TsadeFinal, Letter.Qof, Letter.Resh, Letter.ShinDotless, Letter.Sin,
  Letter.Sin2, Letter.Shin, Letter.Shin2, Letter.TawDagesh, Letter.TawDagesh2, Letter.Taw, Letter.Qamets,
  Letter.QametsHe, Letter.Pathach, Letter.HatephPathach, Letter.Tsere, Letter.TsereHe, Letter.TsereYod,
  Letter.Seghol, Letter.HatephSeghol, Letter.SegholHe, Letter.SegholYod, Letter.Hireq, Letter.HireqYod,
  Letter.Holem, Letter.QametsHatuf, Letter.HatephQamets, Letter.HolemHe, Letter.HolemWaw, Letter.Qibbuts,
  Letter.Shureq, Letter.Shewa, Letter.ShewaSilent, Letter.Accent, Letter.Meteg, Letter.Maqqef, Letter.Dagesh,
  Letter.ShinDot, Letter.SinDot, Letter.SyllableMarker, Letter.NULL];


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
    return this.name === 'ShewaSilent'
      || this.name === 'Accent'
      || this.name === 'Meteg'
      || this.name === 'Maqqef'
      || this.name === 'Dagesh'
      || this.name === 'ShinDot'
      || this.name === 'SinDot'
      || this.name === 'SyllableMarker';
  }

  isConstonant(): boolean {
    return !this.isSymbol() && this.vowelType === null && !this.endVowel;
  }

  isVowel(): boolean {
    return !this.isSymbol() && (this.vowelType != null || this.endVowel);
  }

}
