import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TransliterateComponent } from './transliterate.component';
import { TransliteratorService } from '../transliterator.service';
import { LetterService } from '../letter.service';

describe('TransliterateComponent', () => {
  let component: TransliterateComponent;
  let fixture: ComponentFixture<TransliterateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TransliterateComponent ],
      providers: [ TransliteratorService, LetterService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransliterateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
