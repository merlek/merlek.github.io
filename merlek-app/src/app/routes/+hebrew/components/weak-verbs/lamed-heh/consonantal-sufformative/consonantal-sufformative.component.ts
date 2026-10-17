import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-consonantal-sufformative',
  templateUrl: './consonantal-sufformative.component.html'
})
export class ConsonantalSufformativeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
