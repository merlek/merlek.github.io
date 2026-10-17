import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-a-class',
  templateUrl: './a-class.component.html'
})
export class AClassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
