import {Component, OnInit, Input} from '@angular/core';

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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;

  @Input()
  title: string;
  navs = [
    new Nav('Greek Vocab', '/greek-vocab'),
    new Nav('Hebrew', '/hebrew', [
      new Nav('Transliterate', '/transliterate'),
      new Nav('Complete Qal', '/complete-qal'),
      new Nav('Stem Synopsis', '/stem-synopsis'),
    ]),
  ];

  constructor() {}

  ngOnInit() {
  }

}


