import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GreekVocab } from 'app/routes/+greek-vocab/greekVocab';

@Component({
  selector: 'app-greek-flash-cards',
  templateUrl: './greek-flash-cards.component.html',
  styleUrls: ['../flash-cards.scss']
})
export class GreekFlashCardsComponent implements OnInit {
  @Input() data: GreekVocab[];
  item: GreekVocab;
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
