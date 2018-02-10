import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-greek-vocab',
  templateUrl: './greek-vocab.component.html',
  styleUrls: ['./greek-vocab.component.css']
})
export class GreekVocabComponent implements OnInit {

  title = 'Greek Vocab';
  file = './assets/metzger.json';
  data = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.file)
      .subscribe(
      data => this.data = data,
      err => this.handleError(err)
      );
  }

  format(): string {
    const text = [];
    for (let i = 0; i < arguments.length; ++i) {
      const arg = arguments[i];
      if (arg) { text.push(arg); }
    }
    return text.join(', ');
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
