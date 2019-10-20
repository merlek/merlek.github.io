import { Component, OnInit } from '@angular/core';
import { TransliteratorService } from '../../services/transliterator.service';

@Component({
  selector: 'app-transliterate',
  templateUrl: './transliterate.component.html',
  styles: ['textarea {font-size: 2rem;}']
})
export class TransliterateComponent implements OnInit {
  title = 'Hebrew Transliterator';
  info = 'Note: cannot identify Qamets Hatuf (e.g. ḥoḵmâ not ḥāḵəmâ).';

  hebrewText = '';
  transliteratedText = '';

  constructor(private translitService: TransliteratorService) {}

  ngOnInit() {}

  update(hebrew: string): void {
    if (hebrew) {
      this.transliteratedText = this.translitService.transliterateWord(hebrew);
    } else {
      this.transliteratedText = '';
    }
  }

  // $('#syllabify-checkbox').change(function() {
  //   Transliterate.SYLLABIFY = $('#syllabify-checkbox:checked').val();
  //   updateTransliteratedText();
  // });
}
