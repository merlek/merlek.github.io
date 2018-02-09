import {Component, OnInit} from '@angular/core';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {TransliteratorService} from '../transliterator.service';


@Component({
  selector: 'app-transliterate',
  templateUrl: './transliterate.component.html',
  styleUrls: ['./transliterate.component.css']
})
export class TransliterateComponent implements OnInit {
  title = 'Hebrew Transliterator';
  info = 'Note: cannot identify Qamets Hatuf (e.g. ḥoḵmâ not ḥāḵəmâ).';

  hebrewText = '';
  transliteratedText = '';

  constructor(private translitService: TransliteratorService) {}

  ngOnInit() {}

  update(hebrew: string): void {
    this.transliteratedText =
      this.translitService.transliterateWord(hebrew);
  }

  // $('#syllabify-checkbox').change(function() {
  //   Transliterate.SYLLABIFY = $('#syllabify-checkbox:checked').val();
  //   updateTransliteratedText();
  // });

}
