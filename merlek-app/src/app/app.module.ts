import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { Filter } from './data-grid/filter';
import { Format } from './data-grid/format';
import { OrderBy } from './data-grid/orderby';
import { FlashCardFooterComponent } from './flash-cards/flash-card-footer.component';
import { FlashCardHeaderComponent } from './flash-cards/flash-card-header.component';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';
import { GreekFlashCardsComponent } from './flash-cards/greek/greek-flash-cards.component';
import { HebrewFlashCardsComponent } from './flash-cards/hebrew/hebrew-flash-cards.component';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';
import { HeaderComponent } from './header/header.component';
import { HebrewCompleteQalComponent } from './hebrew/complete-qal/hebrew-complete-qal.component';
import { LetterService } from './hebrew/letter.service';
import { HebrewStemSynopsisComponent } from './hebrew/stem-synopsis/hebrew-stem-synopsis.component';
import { TransliterateComponent } from './hebrew/transliterate/transliterate.component';
import { TransliteratorService } from './hebrew/transliterator.service';
import { HebrewVocabComponent } from './hebrew/vocab/hebrew-vocab.component';
import { AClassComponent } from './hebrew/weak-verbs/gutturals/a-class/a-class.component';
import { DageshForteComponent } from './hebrew/weak-verbs/gutturals/dagesh-forte/dagesh-forte.component';
import { GutturalsComponent } from './hebrew/weak-verbs/gutturals/gutturals.component';
import { SewaComponent } from './hebrew/weak-verbs/gutturals/sewa/sewa.component';
// tslint:disable-next-line:max-line-length
import { ConsonantalSufformativeComponent } from './hebrew/weak-verbs/lamed-heh/consonantal-sufformative/consonantal-sufformative.component';
import { LamedHehComponent } from './hebrew/weak-verbs/lamed-heh/lamed-heh.component';
import { NoSufformativeComponent } from './hebrew/weak-verbs/lamed-heh/no-sufformative/no-sufformative.component';
import { VocalicSufformativeComponent } from './hebrew/weak-verbs/lamed-heh/vocalic-sufformative/vocalic-sufformative.component';
import { HebrewWeakVerbsComponent } from './hebrew/weak-verbs/weak-verbs.component';
import { SearchListComponent } from './search-list/search-list.component';

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
    HebrewWeakVerbsComponent,
    GutturalsComponent,
    DageshForteComponent,
    SewaComponent,
    AClassComponent,
    LamedHehComponent,
    NoSufformativeComponent,
    ConsonantalSufformativeComponent,
    VocalicSufformativeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  entryComponents: [GreekFlashCardsComponent, HebrewFlashCardsComponent],
  providers: [TransliteratorService, LetterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
