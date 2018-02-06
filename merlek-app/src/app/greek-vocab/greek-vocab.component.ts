import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-greek-vocab',
  templateUrl: './greek-vocab.component.html',
  styleUrls: ['./greek-vocab.component.css']
})
export class GreekVocabComponent implements OnInit {
	title = "Greek Vocab";
	csvUrl: string = 'assets/metzger.csv';  // URL to web API
  data: any[] = [];
  headers: string[] = [];

  constructor (private http: Http) {}

  ngOnInit() { this.readCsvData(); }

  readCsvData () {
    this.http.get(this.csvUrl)
    .subscribe(
      data => this.extractJsonData(data),
      err => this.handleError(err)
    );
  }

  format() : string {
  	let text = [];
  	for (var i = 0; i < arguments.length; ++i) {
  		let arg = arguments[i];
  		if (arg) text.push(arg);
  	}
  	return text.join(", ");
  }

  private extractJsonData(res: Response) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    this.headers = allTextLines[0].split(',').map(s => s.toLowerCase());
    let lines = [];

    for ( let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == this.headers.length) {
            let tarr = {};
            for ( let j = 0; j < this.headers.length; j++) {
                tarr[this.headers[j]] = data[j];
            }
            lines.push(tarr);
        }
    }
    this.data = lines;
  }

  private extractCsvData(res: Response) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    this.data = lines;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
