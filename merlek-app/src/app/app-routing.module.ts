import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TransliterateComponent } from './hebrew/transliterate/transliterate.component';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';
import { HebrewCompleteQalComponent } from './hebrew/complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './hebrew/stem-synopsis/hebrew-stem-synopsis.component';
import { HebrewVocabComponent } from './hebrew/vocab/hebrew-vocab.component';
import { HebrewWeakVerbsComponent } from './hebrew/weak-verbs/weak-verbs.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  { path: '', redirectTo: '/greek-vocab', pathMatch: 'full' },
  { path: 'hebrew/transliterate', component: TransliterateComponent },
  { path: 'hebrew/vocab', component: HebrewVocabComponent },
  { path: 'hebrew/complete-qal', component: HebrewCompleteQalComponent },
  { path: 'hebrew/stem-synopsis', component: HebrewStemSynopsisComponent },
  { path: 'hebrew/weak-verbs', component: HebrewWeakVerbsComponent },
  { path: 'greek-vocab', component: GreekVocabComponent },
  { path: 'theme', component: ThemeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
