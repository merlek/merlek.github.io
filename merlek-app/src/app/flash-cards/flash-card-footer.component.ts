import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flash-card-footer',
  template: `
    <div class="modal-footer">
      <button *ngIf="!isShowAnswer" type="button" class="btn btn-outline-primary mx-auto" (click)="showAnswer()">Show Answer</button>
      <div *ngIf="isShowAnswer" class="btn-group mx-auto" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-danger" (click)="again()">Again</button>
        <button type="button" class="btn btn-primary" (click)="next()">Good!</button>
      </div>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>`,
})
export class FlashCardFooterComponent implements OnInit {

  @Input() isShowAnswer: boolean = false;

  @Output() onShowAnswer: EventEmitter<any> = new EventEmitter();
  @Output() onNext: EventEmitter<any> = new EventEmitter();
  @Output() onAgain: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {  }

  showAnswer() {
    this.isShowAnswer = true;
    this.onShowAnswer.emit(true);
  }

  next() {
    this.isShowAnswer = false;
    this.onNext.emit(true);
  }

  again() {
    this.isShowAnswer = false;
    this.onAgain.emit(true);
  }

}
