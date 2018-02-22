import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: ` <app-header [title]="title"></app-header>
              <main class="container" role="main">
                <router-outlet></router-outlet>
              </main>`,
})

export class AppComponent {
  title = 'merlek.github.io';
}
