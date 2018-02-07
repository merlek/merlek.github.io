import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransliterateComponent } from './transliterate/transliterate.component';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';

const routes: Routes = [
	{ path: '', redirectTo: '/transliterate', pathMatch: 'full' },
  { path: 'transliterate', component: TransliterateComponent },
  { path: 'greek-vocab', component: GreekVocabComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}