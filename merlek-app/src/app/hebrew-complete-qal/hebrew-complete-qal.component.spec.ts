import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewCompleteQalComponent } from './hebrew-complete-qal.component';

describe('HebrewCompleteQalComponent', () => {
  let component: HebrewCompleteQalComponent;
  let fixture: ComponentFixture<HebrewCompleteQalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebrewCompleteQalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewCompleteQalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
