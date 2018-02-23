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
  template: `
    <nav class="navbar fixed-top navbar-expand-sm navbar-light">
      <a class="navbar-brand" routerLink="">
        <img src="/assets/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        {{title}}
      </a>
      <button class="navbar-toggler" type="button" (click)="isCollapsed = !isCollapsed"
        [attr.aria-expanded]="!isCollapsed" aria-controls="navbarSupportedContent"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div [ngbCollapse]="isCollapsed" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li *ngFor="let nav of navs" ngbDropdown [class.dropdown]="nav.children" class="nav-item" [routerLinkActive]="['active']">
            <a *ngIf="!nav.children" class="nav-link" routerLink="{{nav.path}}">{{nav.name}}</a>
            <a *ngIf="nav.children" ngbDropdownToggle class="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{nav.name}}</a>
            <div ngbDropdownMenu class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a *ngFor="let child of nav.children" class="dropdown-item" [routerLinkActive]="['active']" routerLink="{{nav.path}}{{child.path}}">{{child.name}}</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles:['.navbar {background: #fff;  opacity: 0.95;}'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;

  @Input()
  title: string;
  navs = [
    new Nav('Greek Vocab', '/greek-vocab'),
    new Nav('Hebrew', '/hebrew', [
      new Nav('Vocab', '/vocab'),
      new Nav('Transliterate', '/transliterate'),
      new Nav('Complete Qal', '/complete-qal'),
      new Nav('Stem Synopsis', '/stem-synopsis'),
    ]),
  ];

  constructor() {}

  ngOnInit() {
  }

}


