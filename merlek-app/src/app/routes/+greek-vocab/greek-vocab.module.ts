import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GreekVocabRoutingModule } from './greek-vocab-routing.module';
import { GreekVocabComponent } from './greek-vocab.component';
import { DataGridModule } from 'app/modules/data-grid/data-grid.module';

@NgModule({
  declarations: [GreekVocabComponent],
  imports: [CommonModule, DataGridModule, GreekVocabRoutingModule, NgbModule]
})
export class GreekVocabModule {}
