import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32,
}

@Component({
  selector: 'app-flash-card-footer',
  template: `
    <div class="modal-footer">
      <button *ngIf="!isShowAnswer" type="button" class="btn btn-primary mx-auto" (click)="showAnswer()">Show Answer</button>
      <div *ngIf="isShowAnswer" class="btn-group mx-auto" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-danger" (click)="again()">Again</button>
        <button type="button" class="btn btn-primary" (click)="next()">Good!</button>
      </div>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>`,
})
export class FlashCardFooterComponent implements OnInit {

  @Input() isShowAnswer = false;

  @Output() showAnswerEmitter: EventEmitter<any> = new EventEmitter();
  @Output() nextEmitter: EventEmitter<any> = new EventEmitter();
  @Output() againEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.SPACE || event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if (!this.isShowAnswer) {
        this.showAnswer();
      } else {
        this.next();
      }
    } else if (event.keyCode === KEY_CODE.LEFT_ARROW && this.isShowAnswer) {
      this.again();
    }
  }

  ngOnInit() {  }

  showAnswer() {
    this.isShowAnswer = true;
    this.showAnswerEmitter.emit(true);
  }

  next() {
    this.isShowAnswer = false;
    this.nextEmitter.emit(true);
  }

  again() {
    this.isShowAnswer = false;
    this.againEmitter.emit(true);
  }

}
