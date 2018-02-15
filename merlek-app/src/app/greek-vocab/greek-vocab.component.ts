import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {GreekVocab} from './greekVocab';
import {DataGridComponent} from '../data-grid/data-grid.component'

@Component({
  selector: 'app-greek-vocab',
  template:`<div class="row justify-content-center">
              <h1>{{title}}</h1>
            </div>
            <div class="row">
              <app-data-grid [columns]="columns"
                             [data]="vocab"
                             [sort]="sorting"
                             [isShowFilter]=true
                             [isExportToCSV]=true
                             [isFlashCards]=true
                             [exportFileName]="exportFileName"
                             [filterIgnore]="filterIgnore">
              </app-data-grid>
            </div>`,
})
export class GreekVocabComponent implements OnInit {

  title = 'Greek Vocab';
  file = './assets/metzger.json';
  vocab: GreekVocab[];
  exportFileName = 'greek_';
  filterIgnore = ['Id'];

  columns: any[] = [
    {
      display: 'Greek', variable: 'Greek', filter: 'text',
    }, {
      display: 'Declension', variable: 'Declension', filter: 'text'
    }, {
      display: 'Article', variable: 'Article', filter: 'text'
    }, {
      display: 'English', variable: 'English', filter: 'text'
    }, {
      display: 'Notes', variable: 'Note', filter: 'text'
    }, {
      display: 'Type', variable: 'Type', filter: 'text'
    }, {
      display: 'Tag', variable: 'Tag', filter: 'text'
    }
  ];

  sorting: any = {
    column: 'Tag',
    descending: true
  };

  @ViewChild(DataGridComponent) dataGrid: DataGridComponent

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
    this.dataGrid.onResize();
  }

  getData(): void {
    this.http.get<GreekVocab[]>(this.file)
      .subscribe(
      data => this.vocab = data,
      err => this.handleError(err)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable('Something bad happened; please try again later.');
  }

}
