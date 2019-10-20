import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hebrew-complete-qal',
  templateUrl: './hebrew-complete-qal.component.html',
  styleUrls: ['./hebrew-complete-qal.component.scss']
})
export class HebrewCompleteQalComponent implements OnInit {
  title = 'Complete Qal';
  vowels = true;

  constructor() { }

  ngOnInit() { }

}
