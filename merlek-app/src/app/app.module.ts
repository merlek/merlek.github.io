import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TransliterateComponent } from './transliterate/transliterate.component';
import { HeaderComponent } from './header/header.component';

import { LetterService } from './letter.service';
import { TransliteratorService } from './transliterator.service';
import { AppRoutingModule } from './/app-routing.module';
import { GreekVocabComponent } from './greek-vocab/greek-vocab.component';
import { HebrewCompleteQalComponent } from './hebrew-complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './hebrew-stem-synopsis/hebrew-stem-synopsis.component';


@NgModule({
  declarations: [
    AppComponent,
    TransliterateComponent,
    HeaderComponent,
    GreekVocabComponent,
    HebrewCompleteQalComponent,
    HebrewStemSynopsisComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [ TransliteratorService, LetterService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
