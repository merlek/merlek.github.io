import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { HebrewVocab } from './hebrewVocab';
import { DataGridComponent } from 'app/modules/data-grid/data-grid.component';

@Component({
  selector: 'app-hebrew-vocab',
  template: `
    <div class="row justify-content-center">
      <h1>Hebrew Vocab</h1>
    </div>
    <app-data-grid
      [columns]="columns"
      [data]="vocab"
      [sort]="sorting"
      [isShowFilter]="true"
      [isExportToCSV]="true"
      [flashCardsType]="'hebrew'"
      [exportFileName]="exportFileName"
      [filterIgnore]="filterIgnore"
    >
    </app-data-grid>
  `
})
export class HebrewVocabComponent implements OnInit {
  file = './assets/hebrew-vocab.json';
  vocab: HebrewVocab[];
  exportFileName = 'hebrew_';
  filterIgnore = ['Id'];

  columns: any[] = [
    {
      display: 'Hebrew',
      variable: 'Hebrew',
      filter: 'text',
      class: 'hebrew'
    },
    {
      display: 'English',
      variable: 'English',
      filter: 'text'
    },
    {
      display: 'Info',
      variable: 'Info',
      filter: 'text'
    },
    {
      display: 'Notes',
      variable: 'Notes',
      filter: 'text'
    },
    {
      display: 'Type',
      variable: 'Type',
      filter: 'number'
    },
    {
      display: 'Freq',
      variable: 'Frequency',
      filter: 'number'
    },
    {
      display: 'Tags',
      variable: 'Tags',
      filter: 'text'
    }
  ];

  sorting: any = {
    column: 'Frequency',
    descending: true
  };

  @ViewChild(DataGridComponent, { static: true }) dataGrid: DataGridComponent;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http
      .get<HebrewVocab[]>(this.file)
      .subscribe(data => (this.vocab = data), err => this.handleError(err));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return ErrorObservable.create(
      'Something bad happened; please try again later.'
    );
  }
}
