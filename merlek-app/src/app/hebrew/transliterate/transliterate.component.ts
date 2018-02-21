import {Component, OnInit} from '@angular/core';
import {TransliteratorService} from '../transliterator.service';


@Component({
  selector: 'app-transliterate',
  templateUrl: './transliterate.component.html',
  styles: ['textarea {font-family: Cardo,Serif; font-size: 2em;}']
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
      this.transliteratedText =
        this.translitService.transliterateWord(hebrew);
    } else {
      this.transliteratedText = '';
    }
  }

  // $('#syllabify-checkbox').change(function() {
  //   Transliterate.SYLLABIFY = $('#syllabify-checkbox:checked').val();
  //   updateTransliteratedText();
  // });

}
