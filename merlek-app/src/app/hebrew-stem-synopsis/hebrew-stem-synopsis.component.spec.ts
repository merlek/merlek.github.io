import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewStemSynopsisComponent } from './hebrew-stem-synopsis.component';

describe('HebrewStemSynopsisComponent', () => {
  let component: HebrewStemSynopsisComponent;
  let fixture: ComponentFixture<HebrewStemSynopsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebrewStemSynopsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewStemSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
