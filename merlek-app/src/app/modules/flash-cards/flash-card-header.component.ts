import { Component, OnInit, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flash-card-header',
  template: `
    <div class="modal-header">
      <h5 class="modal-title text-muted">Cards remaining: {{data.length+1}}</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div>
      <ngb-progressbar role="progressbar" type="success" [value]="max - data.length - 1" [max]="max">
        {{max - data.length - 1}} / {{max}}
      </ngb-progressbar>
    </div>
  `,
})
export class FlashCardHeaderComponent implements OnInit {

  @Input() data: any[];
  max: number;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.max = this.data.length + 1;
  }

}
