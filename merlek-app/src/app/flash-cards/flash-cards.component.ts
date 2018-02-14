import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GreekFlashCardsComponent} from '../greek-flash-cards/greek-flash-cards.component'


@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent implements OnInit {

  @Input() data: any[];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {  }

  open() {
    const modalRef = this.modalService.open(GreekFlashCardsComponent,
    	{ size:"lg" });
    modalRef.componentInstance.data = this.data;
  }

}
