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
  {
    path: 'languages/greek-vocab',
    loadChildren: () =>
      import('./routes/+greek-vocab/greek-vocab.module').then(
        m => m.GreekVocabModule
      )
  },

  {
    path: 'languages/hebrew',
    loadChildren: () =>
      import('./routes/+hebrew/hebrew.module').then(m => m.HebrewModule)
  },
  {
    path: 'theme',
    loadChildren: () =>
      import('./routes/+theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: 'algorithms/tower-of-hanoi',
    loadChildren: () =>
      import('./routes/+algorithms/+tower-of-hanoi/tower-of-hanoi.module').then(
        m => m.TowerOfHanoiModule
      )
  },
  {
    path: 'algorithms/n-queens',
    loadChildren: () =>
      import('./routes/+algorithms/+n-queens/n-queens.module').then(
        m => m.NQueensModule
      )
  },
  {
    path: 'algorithms/edit-distance',
    loadChildren: () =>
      import('./routes/+algorithms/+edit-distance/edit-distance.module').then(
        m => m.EditDistanceModule
      )
  },
  {
    path: 'games/snake',
    loadChildren: () =>
      import('./routes/+games/snake/snake.module').then(m => m.SnakeModule)
  },
  {
    path: 'games/tic-tac-toe',
    loadChildren: () =>
      import('./routes/+games/tic-tac-toe/tic-tac-toe.module').then(
        m => m.TicTacToeModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
