import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { GreekVocab } from './greekVocab';
import { DataGridComponent } from 'app/modules/data-grid/data-grid.component';

@Component({
  selector: 'app-greek-vocab',
  templateUrl: './greek-vocab.component.html'
})
export class GreekVocabComponent implements OnInit {
  file = './assets/greek-vocab.json';
  vocab: GreekVocab[];
  exportFileName = 'greek_';
  filterIgnore = ['Id'];

  columns: any[] = [
    {
      display: 'Greek',
      variable: 'Greek',
      filter: 'text'
    },
    {
      display: 'Declension',
      variable: 'Declension',
      filter: 'text'
    },
    {
      display: 'Article',
      variable: 'Article',
      filter: 'text'
    },
    {
      display: 'English',
      variable: 'English',
      filter: 'text'
    },
    {
      display: 'Notes',
      variable: 'Notes',
      filter: 'text'
    },
    {
      display: 'Freq',
      variable: 'Frequency',
      filter: 'number'
    },
    {
      display: 'Type',
      variable: 'Type',
      filter: 'text'
    },
    {
      display: 'Tags',
      variable: 'Tags',
      filter: 'text'
    }
  ];

  sorting: any = null;
  // {
  //   column: 'Frequency',
  //   descending: true
  // };

  tags = [
    { tag: 'BBG', description: 'Basics of Biblical Greek (Mounce)' },
    { tag: 'Croy', description: 'A Primer of Biblical Greek (Croy)' },
    {
      tag: 'Mz',
      description: 'Lexical Aides for Students of New Testament Greek (Metzger)'
    }
  ];

  @ViewChild(DataGridComponent, { static: true }) dataGrid: DataGridComponent;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http
      .get<GreekVocab[]>(this.file)
      .subscribe(
        data => (this.vocab = this.shuffle(data)),
        err => this.handleError(err)
      );
  }

  private shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
