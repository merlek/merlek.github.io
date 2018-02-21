import { Component, OnInit, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HebrewVocab} from '../../hebrew/vocab/hebrewVocab';

@Component({
  selector: 'app-hebrew-flash-cards',
  templateUrl: './hebrew-flash-cards.component.html',
  styleUrls: ['./hebrew-flash-cards.component.css']
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
    if(!this.item) {
      this.activeModal.close();
    }
  }

  again() {
    this.data.push(this.item);
    this.next();
  }

}
