import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TransliterateComponent } from './hebrew/transliterate/transliterate.component';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';
import { HebrewCompleteQalComponent } from './hebrew/complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './hebrew/stem-synopsis/hebrew-stem-synopsis.component';
import { HebrewVocabComponent } from './hebrew/vocab/hebrew-vocab.component';

const routes: Routes = [
  { path: '', redirectTo: '/greek-vocab', pathMatch: 'full' },
  { path: 'hebrew/transliterate', component: TransliterateComponent },
  { path: 'hebrew/vocab', component: HebrewVocabComponent },
  { path: 'hebrew/complete-qal', component: HebrewCompleteQalComponent },
  { path: 'hebrew/stem-synopsis', component: HebrewStemSynopsisComponent },
  { path: 'greek-vocab', component: GreekVocabComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
