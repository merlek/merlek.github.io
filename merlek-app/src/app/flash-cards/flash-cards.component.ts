import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GreekFlashCardsComponent} from './greek/greek-flash-cards.component'
import {HebrewFlashCardsComponent} from './hebrew/hebrew-flash-cards.component'


@Component({
  selector: 'app-flash-cards',
  template: `<button class="btn btn-primary" (click)="open()">Flash Cards</button>`,
})
export class FlashCardsComponent implements OnInit {

  @Input() cardType: string;
  @Input() data: any[];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {  }

  open() {
    let comp = null;
    if(this.cardType === "greek") {
      comp = GreekFlashCardsComponent;
    } else if (this.cardType === "hebrew"){
      comp = HebrewFlashCardsComponent;
    }

    if(comp !== null) {
      const modalRef = this.modalService.open(comp,
      	{ size:"lg" });
      modalRef.componentInstance.data = this.data.slice();
    }
  }

}
