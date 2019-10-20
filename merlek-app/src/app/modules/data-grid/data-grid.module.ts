import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlashCardsModule } from './components/flash-cards/flash-cards.module';
import { GreekFlashCardsComponent } from './components/flash-cards/greek/greek-flash-cards.component';
import { HebrewFlashCardsComponent } from './components/flash-cards/hebrew/hebrew-flash-cards.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { DataGridComponent } from './data-grid.component';
import { Filter } from './pipes/filter';
import { Format } from './pipes/format';
import { OrderBy } from './pipes/orderby';

@NgModule({
  imports: [
    CommonModule,
    FlashCardsModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule
  ],
  declarations: [
    DataGridComponent,
    Filter,
    Format,
    OrderBy,
    SearchListComponent
  ],
  exports: [DataGridComponent],
  entryComponents: [GreekFlashCardsComponent, HebrewFlashCardsComponent]
})
export class DataGridModule {}
