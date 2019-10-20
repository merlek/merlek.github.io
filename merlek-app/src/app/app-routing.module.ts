import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HebrewCompleteQalComponent } from './hebrew/complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './hebrew/stem-synopsis/hebrew-stem-synopsis.component';
import { TransliterateComponent } from './hebrew/transliterate/transliterate.component';
import { HebrewVocabComponent } from './hebrew/vocab/hebrew-vocab.component';
import { HebrewWeakVerbsComponent } from './hebrew/weak-verbs/weak-verbs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hebrew/transliterate', component: TransliterateComponent },
  { path: 'hebrew/vocab', component: HebrewVocabComponent },
  { path: 'hebrew/complete-qal', component: HebrewCompleteQalComponent },
  { path: 'hebrew/stem-synopsis', component: HebrewStemSynopsisComponent },
  { path: 'hebrew/weak-verbs', component: HebrewWeakVerbsComponent },
  {
    path: 'greek-vocab',
    loadChildren: () =>
      import('./routes/greek-vocab/greek-vocab.module').then(
        m => m.GreekVocabModule
      )
  },
  {
    path: 'theme',
    loadChildren: () =>
      import('./routes/+theme/theme.module').then(m => m.ThemeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
