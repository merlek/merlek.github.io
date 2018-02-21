import { Component, OnInit, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GreekVocab} from '../../greek-vocab/greekVocab';



@Component({
  selector: 'app-greek-flash-cards',
  templateUrl: './greek-flash-cards.component.html',
  styleUrls: ['./greek-flash-cards.component.css']
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
  	if(!this.item) {
  		this.activeModal.close();
  	}
  }

  again() {
  	this.data.push(this.item);
  	this.next();
  }
}
