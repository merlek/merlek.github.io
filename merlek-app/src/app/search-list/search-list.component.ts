import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

export class SearchLogic {

  static OR = new SearchLogic('OR');
  static AND = new SearchLogic('AND');

  value: string;

  private constructor(logic: string) {
    this.value = logic;
  }


  other(): SearchLogic {
    if (this === SearchLogic.OR) {
      return SearchLogic.AND;
    } else {
      return SearchLogic.OR;
    }
  }

}

export class SearchMatch {

  static EXACT = new SearchMatch('EXACT');
  static CONTAINS = new SearchMatch('CONTAINS');

  value: string;

  private constructor(match: string) {
    this.value = match;
  }

  other(): SearchMatch {
    if (this === SearchMatch.EXACT) {
      return SearchMatch.CONTAINS;
    } else {
      return SearchMatch.EXACT;
    }
  }

}

export class SearchEvent {

  search: string;
  match: SearchMatch;
  logic: SearchLogic;


  constructor(search: string, match: SearchMatch, logic: SearchLogic) {
    this.search = search;
    this.match = match;
    this.logic = logic;
  }

}

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  search: string;
  logic = SearchLogic.OR;
  match = SearchMatch.EXACT;

  @Input() title: string;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute) {}

  emitChange(): void {
    const search = new SearchEvent(this.search, this.match, this.logic);
    this.change.emit(search);
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params.filter) {
      this.search = params.filter;
    }

    this.emitChange();
  }

  swapLogic() {
    this.logic = this.logic.other();
    this.emitChange();
  }

  swapMatch() {
    this.match = this.match.other();
    this.emitChange();
  }

  getEachChar(value: any) {
    this.search = value;
    this.emitChange();
  }

  clearFilter() {
    this.search = null;
    this.emitChange();
  }

  getPasteData(value: any) {
    const pastedVal = value.clipboardData.getData('text/plain');
    this.search = pastedVal;
    this.emitChange();
    value.preventDefault();
  }
}
