import {Component, OnInit, Input} from '@angular/core';

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
    new Nav('Hebrew', '/hebrew', [
      new Nav('Transliterate', '/transliterate'),
      new Nav('Complete Qal', '/complete-qal'),
    ]),
    new Nav('Greek Vocab', '/greek-vocab'),
  ];

  constructor() {}

  ngOnInit() {
  }

}

export class Nav {

  name: string;
  path: string;
  children: Nav[];

  constructor(name: string, path: string, children?: Nav[]) {
    this.name = name;
    this.path = path;
    this.children = children;
  }

}
