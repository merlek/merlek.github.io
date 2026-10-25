import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentFlowComponent } from './routes/+agentflow/agentflow.component';
import { HealthCoachComponent } from './routes/+health-coach/health-coach.component';
import { HomeComponent } from './routes/+home/home.component';
import { ResumeComponent } from './routes/+resume/resume.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'projects/health-coach', component: HealthCoachComponent },
  { path: 'projects/agentflow', component: AgentFlowComponent },
  // Retired project bookmarks and unknown routes return to the current portfolio.
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
