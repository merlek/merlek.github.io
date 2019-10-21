import { Component, OnInit, Input } from '@angular/core';

export class Nav {
  name: string;
  path: string;
  children?: Nav[];

  constructor(name: string, path: string, children?: Nav[]) {
    this.name = name;
    this.path = path;
    this.children = children;
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.navbar {background: #fff;  opacity: 0.95;}']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;

  @Input()
  title: string;
  navs: Nav[] = [
    new Nav('Languages', 'languages', [
      new Nav('Greek Vocab', 'greek-vocab'),
      new Nav('Hebrew', 'hebrew', [
        new Nav('Vocab', 'vocab'),
        new Nav('Transliterate', 'transliterate'),
        new Nav('Complete Qal', 'complete-qal'),
        new Nav('Stem Synopsis', 'stem-synopsis'),
        new Nav('Weak Verbs', 'weak-verbs')
      ])
    ]),
    new Nav('Algorithms', 'algorithms')
  ];

  constructor() {}

  ngOnInit() {}
}
