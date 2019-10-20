import { Routes, RouterModule } from '@angular/router';
import { GreekVocabComponent } from './greek-vocab.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [{ path: '', component: GreekVocabComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GreekVocabRoutingModule {}
