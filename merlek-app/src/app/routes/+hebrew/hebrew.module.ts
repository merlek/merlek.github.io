import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataGridModule } from 'app/modules/data-grid/data-grid.module';
import { TabsModule } from 'ngx-bootstrap';
import { HebrewCompleteQalComponent } from './components/complete-qal/hebrew-complete-qal.component';
import { HebrewStemSynopsisComponent } from './components/stem-synopsis/hebrew-stem-synopsis.component';
import { TransliterateComponent } from './components/transliterate/transliterate.component';
import { HebrewVocabComponent } from './components/vocab/hebrew-vocab.component';
import { AClassComponent } from './components/weak-verbs/gutturals/a-class/a-class.component';
import { DageshForteComponent } from './components/weak-verbs/gutturals/dagesh-forte/dagesh-forte.component';
import { GutturalsComponent } from './components/weak-verbs/gutturals/gutturals.component';
import { SewaComponent } from './components/weak-verbs/gutturals/sewa/sewa.component';
// tslint:disable-next-line:max-line-length
import { ConsonantalSufformativeComponent } from './components/weak-verbs/lamed-heh/consonantal-sufformative/consonantal-sufformative.component';
import { LamedHehComponent } from './components/weak-verbs/lamed-heh/lamed-heh.component';
import { NoSufformativeComponent } from './components/weak-verbs/lamed-heh/no-sufformative/no-sufformative.component';
import { VocalicSufformativeComponent } from './components/weak-verbs/lamed-heh/vocalic-sufformative/vocalic-sufformative.component';
import { HebrewWeakVerbsComponent } from './components/weak-verbs/weak-verbs.component';
import { HebrewRoutingModule } from './hebrew-routing.module';
import { HebrewTabComponent } from './components/hebrew-tab/hebrew-tab.component';
import { LetterService } from './services/letter.service';
import { TransliteratorService } from './services/transliterator.service';

@NgModule({
  declarations: [
    AClassComponent,
    ConsonantalSufformativeComponent,
    DageshForteComponent,
    GutturalsComponent,
    HebrewCompleteQalComponent,
    HebrewTabComponent,
    HebrewStemSynopsisComponent,
    HebrewVocabComponent,
    HebrewWeakVerbsComponent,
    LamedHehComponent,
    NoSufformativeComponent,
    SewaComponent,
    TransliterateComponent,
    VocalicSufformativeComponent
  ],
  imports: [
    CommonModule,
    DataGridModule,
    FormsModule,
    HebrewRoutingModule,
    NgbModule,
    TabsModule.forRoot()
  ],
  providers: [TransliteratorService, LetterService]
})
export class HebrewModule {}
