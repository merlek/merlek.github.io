import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-agentflow',
  templateUrl: './agentflow.component.html',
  styleUrls: ['../+home/home.component.scss']
})
export class AgentFlowComponent {}
