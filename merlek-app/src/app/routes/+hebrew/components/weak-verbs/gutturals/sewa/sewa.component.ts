import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-sewa',
  templateUrl: './sewa.component.html'
})
export class SewaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
