import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/+home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
