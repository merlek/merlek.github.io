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
  @Input()
  navs: Nav[];

  constructor() {}

  ngOnInit() {}
}
