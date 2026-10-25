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
    new Nav('AgentFlow', 'projects/agentflow')
  ];
}
