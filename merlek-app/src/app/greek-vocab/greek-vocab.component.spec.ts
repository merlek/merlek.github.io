import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreekVocabComponent } from './greek-vocab.component';

describe('GreekVocabComponent', () => {
  let component: GreekVocabComponent;
  let fixture: ComponentFixture<GreekVocabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreekVocabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreekVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
