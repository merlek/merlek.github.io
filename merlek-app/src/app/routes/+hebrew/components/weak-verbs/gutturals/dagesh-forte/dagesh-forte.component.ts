import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-dagesh-forte',
  templateUrl: './dagesh-forte.component.html'
})
export class DageshForteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
