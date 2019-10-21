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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
