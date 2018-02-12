import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TransliterateComponent} from './transliterate/transliterate.component';
import {HeaderComponent} from './header/header.component';

import {LetterService} from './letter.service';
import {TransliteratorService} from './transliterator.service';
import {AppRoutingModule} from './/app-routing.module';
import {GreekVocabComponent} from './greek-vocab/greek-vocab.component';
import {GreekFilterPipe} from './greek-vocab/greekFilter';
import {HebrewCompleteQalComponent} from './hebrew-complete-qal/hebrew-complete-qal.component';
import {HebrewStemSynopsisComponent} from './hebrew-stem-synopsis/hebrew-stem-synopsis.component';
import {DataGridComponent} from './data-grid/data-grid.component';
import {Format} from './data-grid/format';
import {OrderBy} from './data-grid/orderby';
import {SearchListComponent} from './search-list/search-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TransliterateComponent,
    HeaderComponent,
    GreekVocabComponent,
    GreekFilterPipe,
    HebrewCompleteQalComponent,
    HebrewStemSynopsisComponent,
    DataGridComponent,
    Format,
    OrderBy,
    SearchListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [TransliteratorService, LetterService, GreekFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
