import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-weak-verbs',
  templateUrl: './weak-verbs.component.html',
  styleUrls: ['./weak-verbs.component.scss']
})
export class HebrewWeakVerbsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
