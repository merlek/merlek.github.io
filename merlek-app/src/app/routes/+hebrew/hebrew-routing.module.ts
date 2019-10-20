import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HebrewCompleteQalComponent } from './components/complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './components/stem-synopsis/hebrew-stem-synopsis.component';
import { TransliterateComponent } from './components/transliterate/transliterate.component';
import { HebrewVocabComponent } from './components/vocab/hebrew-vocab.component';
import { HebrewWeakVerbsComponent } from './components/weak-verbs/weak-verbs.component';

export const routes: Routes = [
  { path: 'transliterate', component: TransliterateComponent },
  { path: 'vocab', component: HebrewVocabComponent },
  { path: 'complete-qal', component: HebrewCompleteQalComponent },
  { path: 'stem-synopsis', component: HebrewStemSynopsisComponent },
  { path: 'weak-verbs', component: HebrewWeakVerbsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HebrewRoutingModule {}
