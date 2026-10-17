import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-no-sufformative',
  templateUrl: './no-sufformative.component.html'
})
export class NoSufformativeComponent implements OnInit {

  endings = [
    { tense: 'Perfect', vowel: 'ָ' },
    { tense: 'Imperfect', vowel: 'ֶ' },
    { tense: 'Imperative', vowel: 'ֵ' },
    { tense: 'Participle', vowel: 'ֶ' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
