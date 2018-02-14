import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';


export class SearchLogic { 

  static OR = new SearchLogic("OR");
  static AND = new SearchLogic("AND");

  logicalOperator: string;
  
  constructor(logic:string) {
    this.logicalOperator = logic;
  }

}

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  listFilter: string;

  logicActive= SearchLogic.OR;
  logicInactive = SearchLogic.AND;

  @Input() title: string;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.change.emit(this.logicActive);
  }

  swapLogic(value: SearchLogic) {
    this.logicInactive = this.logicActive;
    this.logicActive = value;
    this.change.emit(this.logicActive);
  }

  getEachChar(value: any) {
    this.change.emit(value);
  }

  clearFilter() {
    this.listFilter = null;
    this.change.emit(null);
  }

  getPasteData(value: any) {
    const pastedVal = value.clipboardData.getData('text/plain');
    this.listFilter = pastedVal;
    this.change.emit(pastedVal);
    value.preventDefault();
  }
}
