import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  listFilter: string;
  @Input() title: string;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  getEachChar(value: any) {
    this.change.emit(value);
  }

  clearFilter() {
    this.listFilter = null;
    this.change.emit(null);
  }

  getPasteData(value: any) {
    const pastedVal = value.clipboardData.getData('text/plain');
    this.change.emit(pastedVal);
    value.preventDefault();
  }
}
