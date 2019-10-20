import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlashCardFooterComponent } from './flash-card-footer.component';
import { FlashCardHeaderComponent } from './flash-card-header.component';
import { FlashCardsComponent } from './flash-cards.component';
import { GreekFlashCardsComponent } from './greek/greek-flash-cards.component';
import { HebrewFlashCardsComponent } from './hebrew/hebrew-flash-cards.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgxPaginationModule, NgbModule],
  declarations: [
    FlashCardsComponent,
    FlashCardHeaderComponent,
    FlashCardFooterComponent,
    GreekFlashCardsComponent,
    HebrewFlashCardsComponent
  ],
  exports: [FlashCardsComponent],
  entryComponents: [GreekFlashCardsComponent, HebrewFlashCardsComponent]
})
export class FlashCardsModule {}
