import { ChangeDetectionStrategy, Component } from '@angular/core';
import resume from '../../../resume/resume-content.json';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  readonly resume = resume;
}
