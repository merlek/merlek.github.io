import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hebrew-stem-synopsis',
  templateUrl: './hebrew-stem-synopsis.component.html',
  styleUrls: ['./hebrew-stem-synopsis.component.css']
})
export class HebrewStemSynopsisComponent implements OnInit {
  title = 'Stem Synopsis';
  tenseForm = true;

  constructor() { }

  ngOnInit() {
  }

}
