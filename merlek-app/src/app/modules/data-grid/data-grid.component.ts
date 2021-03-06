import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { SearchEvent } from './components/search-list/search-list.component';
import { DataGridUtil } from './data-grid.util';
import { Filter } from './pipes/filter';
import { Format } from './pipes/format';
import { OrderBy } from './pipes/orderby';

export interface GridAction {
  action: string;
  values: {
    key: string;
    value: string;
  }[];
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnChanges {
  // Input Variables
  @Input() columns: any[];
  @Input() data: any[];
  @Input() sort: any;
  @Input() gridbtns: any[];
  @Input() hdrbtns: any[];
  @Input() isShowFilter: boolean;
  @Input() isExportToCSV: boolean;
  @Input() flashCardsType: string;
  @Input() exportFileName: string;
  @Input() filterIgnore: string[];

  // Output Variable
  @Output()
  btnclick: EventEmitter<GridAction> = new EventEmitter<GridAction>();

  // Local Variable
  pdata: any[] = this.data;
  search: SearchEvent;
  searchTitle = 'Search:';
  page = 0;
  pageSize = 10;

  filter = new Filter();
  orderBy = new OrderBy();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (JSON.stringify(changes).indexOf('data') !== -1) {
      this.pdata = this.data;
    }
    this.criteriaChange(changes);
  }

  selectedClass(columnName: string): any {
    return this.sort && columnName === this.sort.column
      ? 'sort-' + this.sort.descending
      : false;
  }

  changeSorting(columnName: string): void {
    if (!this.sort) {
      this.sort = {};
    }
    const sort = this.sort;
    if (sort.column === columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
    this.pdata = this.getTransformedData();
  }

  convertSorting(): string[] {
    const sort = [];
    if (this.sort) {
      sort.push(
        this.sort.descending ? '-' + this.sort.column : this.sort.column
      );
      sort.push('+Greek');
    }
    return sort;
  }

  click(btn: any, row: any): void {
    const keyds = <GridAction>{};
    keyds.action = btn.action;

    if (row != null) {
      keyds.values = [];
      btn.keys.forEach((key: any) => {
        keyds.values.push({ key: key, value: row[key] });
      });
    }
    this.btnclick.emit(keyds);
  }

  criteriaChange(value: any) {
    if (!(value instanceof Event)) {
      if (value instanceof SearchEvent) {
        this.search = value;
      }
      this.pdata = this.getTransformedData();
    }
  }

  getTransformedData() {
    return this.orderBy.transform(
      this.filter.transform(this.data, this.search, this.filterIgnore),
      this.convertSorting()
    );
  }

  exportToCSV() {
    const exprtcsv: any[] = [];
    (<any[]>JSON.parse(JSON.stringify(this.pdata))).forEach(x => {
      const obj = new Object();
      const frmt = new Format();
      for (let i = 0; i < this.columns.length; i++) {
        const transfrmVal = frmt.transform(
          x[this.columns[i].variable],
          this.columns[i].filter
        );
        obj[this.columns[i].display] = transfrmVal;
      }
      exprtcsv.push(obj);
    });
    DataGridUtil.downloadcsv(exprtcsv, this.exportFileName);
  }

  setPageSize(value: number) {
    this.pageSize = value;
  }

  pdataRange(): any[] {
    const arr = [];
    for (let i = 10; i < this.pdata.length; i = i * 2) {
      arr.push(i);
    }
    arr.push(this.pdata.length);
    return arr;
  }
}
