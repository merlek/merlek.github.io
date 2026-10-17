import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-vocalic-sufformative',
  templateUrl: './vocalic-sufformative.component.html'
})
export class VocalicSufformativeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
