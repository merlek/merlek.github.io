import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

export class Tab {
  name: string;
  path: string;
  active = false;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

@Component({
  selector: 'app-hebrew-tab',
  templateUrl: './hebrew-tab.component.html'
})
export class HebrewTabComponent implements OnInit {
  public isCollapsed = true;

  @Input()
  selectedTab;

  basePath = 'languages/hebrew';

  tabs = [
    new Tab('Vocab', 'vocab'),
    new Tab('Transliterate', 'transliterate'),
    new Tab('Complete Qal', 'complete-qal'),
    new Tab('Stem Synopsis', 'stem-synopsis'),
    new Tab('Weak Verbs', 'weak-verbs')
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.tabs.forEach(element => {
      if (this.selectedTab === element.path) {
        element.active = true;
      }
    });
  }

  onSelect(path: string): void {
    this.router.navigateByUrl(this.basePath + '/' + path);
  }
}
