import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TransliterateComponent } from './transliterate/transliterate.component';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';

const routes: Routes = [
  { path: '', redirectTo: '/transliterate', pathMatch: 'full' },
  { path: 'transliterate', component: TransliterateComponent },
  { path: 'greek-vocab', component: GreekVocabComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {}