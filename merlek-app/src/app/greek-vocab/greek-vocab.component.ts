import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GreekVocab} from './greekVocab';
import {GreekFilterPipe} from './greekFilter';

@Component({
  selector: 'app-greek-vocab',
  templateUrl: './greek-vocab.component.html',
  styleUrls: ['./greek-vocab.component.css']
})
export class GreekVocabComponent implements OnInit {

  title = 'Greek Vocab';
  file = './assets/metzger.json';
  vocab: GreekVocab[];
  exportFileName = 'greek_';

  columns: any[] = [
    {
      display: 'Greek',
      variable: 'Greek',
      filter: 'text',
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
      variable: 'Note',
      filter: 'text'
    },
    {
      display: 'Type',
      variable: 'Type',
      filter: 'text'
    },
    {
      display: 'Tag',
      variable: 'Tag',
      filter: 'text'
    }
  ];

  sorting: any = {
    column: 'Tag',
    descending: true
  };

  constructor(private http: HttpClient, public greekFilter: GreekFilterPipe) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<GreekVocab[]>(this.file)
      .subscribe(
      data => this.vocab = data,
      err => this.handleError(err)
      );
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
