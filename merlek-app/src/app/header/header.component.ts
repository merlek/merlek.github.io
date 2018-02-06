import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {'class': 'masthead mb-auto'}
})
export class HeaderComponent implements OnInit {

	@Input()
	title: string;
	navs = [
 		{ name: 'Hebrew Transliterate', path: '/transliterate' },
 		{ name: 'Greek Vocab', path: '/greek-vocab' },
	];

  constructor() { }

  ngOnInit() {
  }

}
