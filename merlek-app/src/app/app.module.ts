import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from './app.component';
import {TransliterateComponent} from './transliterate/transliterate.component';
import {HeaderComponent} from './header/header.component';

import {LetterService} from './letter.service';
import {TransliteratorService} from './transliterator.service';
import {AppRoutingModule} from './/app-routing.module';
import {GreekVocabComponent} from './greek-vocab/greek-vocab.component';
import {HebrewCompleteQalComponent} from './hebrew-complete-qal/hebrew-complete-qal.component';
import {HebrewStemSynopsisComponent} from './hebrew-stem-synopsis/hebrew-stem-synopsis.component';
import {DataGridComponent} from './data-grid/data-grid.component';
import {Format} from './data-grid/format';
import {OrderBy} from './data-grid/orderby';
import {Filter} from './data-grid/filter';
import {SearchListComponent} from './search-list/search-list.component';
import {FlashCardsComponent} from './flash-cards/flash-cards.component';
import {GreekFlashCardsComponent} from './greek-flash-cards/greek-flash-cards.component';


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
    GreekFlashCardsComponent
  ],
  providers: [TransliteratorService, LetterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
