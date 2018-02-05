import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {'class': 'masthead mb-auto'}
})
export class HeaderComponent implements OnInit {

	@Input()
	title: string;

  constructor() { }

  ngOnInit() {
  }

}
