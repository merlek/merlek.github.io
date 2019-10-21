import { Component } from '@angular/core';
import { Nav } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'merlek.github.io';

  navs = [
    new Nav('Languages', 'languages', [
      new Nav('Greek Vocab', 'greek-vocab'),
      new Nav('Hebrew', 'hebrew')
    ]),
    new Nav('Algorithms', 'algorithms')
  ];
}
