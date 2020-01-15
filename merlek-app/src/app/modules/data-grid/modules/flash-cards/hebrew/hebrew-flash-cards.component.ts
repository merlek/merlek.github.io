import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HebrewVocab } from 'app/routes/+hebrew/components/vocab/hebrewVocab';

@Component({
  selector: 'app-hebrew-flash-cards',
  templateUrl: './hebrew-flash-cards.component.html',
  styleUrls: ['../flash-cards.scss']
})
export class HebrewFlashCardsComponent implements OnInit {
  @Input() data: HebrewVocab[];
  item: HebrewVocab;
  isShowAnswer = false;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {
    this.item = this.data.shift();
  }
  showAnswer() {
    this.isShowAnswer = true;
  }
  next() {
    this.isShowAnswer = false;
    this.item = this.data.shift();
    if (!this.item) {
      this.activeModal.close();
    }
  }
  again() {
    this.data.push(this.item);
    this.next();
  }
}
