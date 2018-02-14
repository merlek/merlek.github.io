import {Component, Input, OnInit, OnChanges, Output, EventEmitter, AfterViewInit, PipeTransform, Pipe} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {DataGridUtil} from './data-grid.util';
import {Format} from './format';

export interface GridAction {
  action: string;
  values: {
    key: string,
    value: string
  }[];
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
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
  @Input() exportFileName: string;
  @Input() filter: PipeTransform;
  @Input() filterIgnore: string[];

  // Output Variable
  @Output()
  btnclick: EventEmitter<GridAction> = new EventEmitter<GridAction>();

  // Local Variable
  pdata: any[] = this.data;
  listFilter: string;
  searchTitle = 'Search:';
  tableHeight = this.calculateTableHeight();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (JSON.stringify(changes).indexOf('data') !== -1) {
      this.pdata = this.data;
    }
    this.criteriaChange(this.listFilter);
  }

  calculateTableHeight(): number {
    const e = document.getElementsByTagName('table')[0];
    let top = 198;
    if (e) {
      top = e.getBoundingClientRect().top;
    }
    return window.innerHeight - top;
  }

  onResize(event: Event) {
    this.tableHeight = this.calculateTableHeight();
  }

  selectedClass(columnName: string): any {
    return columnName === this.sort.column ? 'sort-' + this.sort.descending : false;
  }

  changeSorting(columnName: string): void {
    const sort = this.sort;
    if (sort.column === columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }

  convertSorting(): string {
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }

  click(btn: any, row: any): void {
    const keyds = <GridAction>{};
    keyds.action = btn.action;

    if (row != null) {
      keyds.values = [];
      btn.keys.forEach((key: any) => {
        keyds.values.push({key: key, value: row[key]});
      });
    }
    this.btnclick.emit(keyds);
  }

  criteriaChange(value: any) {
    if (!(value instanceof Event)) {
      this.listFilter = value;
      if (this.filter != null) {
        this.pdata = this.filter.transform(this.data, this.listFilter);
      }
    }
  }

  exportToCSV() {
    const exprtcsv: any[] = [];
    (<any[]>JSON.parse(JSON.stringify(this.pdata))).forEach(x => {
      const obj = new Object();
      const frmt = new Format();
      for (let i = 0; i < this.columns.length; i++) {
        const transfrmVal = frmt.transform(x[this.columns[i].variable], this.columns[i].filter);
        obj[this.columns[i].display] = transfrmVal;
      }
      exprtcsv.push(obj);
    });
    DataGridUtil.downloadcsv(exprtcsv, this.exportFileName);
  }

}
