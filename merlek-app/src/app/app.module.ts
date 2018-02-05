import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TransliterateComponent } from './transliterate/transliterate.component';
import { HeaderComponent } from './header/header.component';

import { LetterService } from './letter.service';
import { TransliteratorService } from './transliterator.service';


@NgModule({
  declarations: [
    AppComponent,
    TransliterateComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [ TransliteratorService, LetterService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
