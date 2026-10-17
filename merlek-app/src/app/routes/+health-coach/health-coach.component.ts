import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-health-coach',
  templateUrl: './health-coach.component.html',
  styleUrls: ['../+home/home.component.scss']
})
export class HealthCoachComponent {}
