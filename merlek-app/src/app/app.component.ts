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
    new Nav('Algorithms', 'algorithms', [
      new Nav('Tower of Hanoi', 'tower-of-hanoi'),
      new Nav('N Queens', 'n-queens'),
      new Nav('Edit Distance', 'edit-distance')
    ]),
    new Nav('Games', 'games', [new Nav('Snake', 'snake')])
  ];
}
