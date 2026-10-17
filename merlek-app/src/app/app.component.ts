import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Nav } from './components/header/header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  focusMain(event: Event) {
    event.preventDefault();
    document.getElementById('main').focus();
  }

  title = 'Merle Klein';

  navs = [
    new Nav('Portfolio', 'home'),
    new Nav('Health Coach', 'projects/health-coach'),
    new Nav('Languages', 'languages', [
      new Nav('Greek Vocab', 'greek-vocab'),
      new Nav('Hebrew', 'hebrew')
    ]),
    new Nav('Algorithms', 'algorithms', [
      new Nav('Tower of Hanoi', 'tower-of-hanoi'),
      new Nav('N Queens', 'n-queens'),
      new Nav('Edit Distance', 'edit-distance')
    ]),
    new Nav('Games', 'games', [
      new Nav('Snake', 'snake'),
      new Nav('Tic Tac Toe', 'tic-tac-toe')
    ])
  ];
}
