import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { TransliterateComponent } from './hebrew/transliterate/transliterate.component';
import { HeaderComponent } from './header/header.component';

import { LetterService } from './hebrew/letter.service';
import { TransliteratorService } from './hebrew/transliterator.service';
import { AppRoutingModule } from './/app-routing.module';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';
import { HebrewCompleteQalComponent } from './hebrew/complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './hebrew/stem-synopsis/hebrew-stem-synopsis.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { Format } from './data-grid/format';
import { OrderBy } from './data-grid/orderby';
import { Filter } from './data-grid/filter';
import { SearchListComponent } from './search-list/search-list.component';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';
import { GreekFlashCardsComponent } from './flash-cards/greek/greek-flash-cards.component';
import { HebrewVocabComponent } from './hebrew/vocab/hebrew-vocab.component';
import { HebrewFlashCardsComponent } from './flash-cards/hebrew/hebrew-flash-cards.component';
import { FlashCardHeaderComponent } from './flash-cards/flash-card-header.component';
import { FlashCardFooterComponent } from './flash-cards/flash-card-footer.component';
import { ThemeComponent } from './theme/theme.component';
import { HebrewWeakVerbsComponent } from './hebrew/weak-verbs/weak-verbs.component';
import { GutturalsComponent } from './hebrew/weak-verbs/gutturals/gutturals.component';


@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent,
    Filter,
    FlashCardsComponent,
    Format,
    GreekFlashCardsComponent,
    GreekVocabComponent,
    HeaderComponent,
    HebrewCompleteQalComponent,
    HebrewStemSynopsisComponent,
    OrderBy,
    SearchListComponent,
    TransliterateComponent,
    HebrewVocabComponent,
    HebrewFlashCardsComponent,
    FlashCardHeaderComponent,
    FlashCardFooterComponent,
    ThemeComponent,
    HebrewWeakVerbsComponent,
    GutturalsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [
    GreekFlashCardsComponent,
    HebrewFlashCardsComponent,
  ],
  providers: [TransliteratorService, LetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
