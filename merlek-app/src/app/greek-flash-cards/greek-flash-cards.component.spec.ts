import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreekFlashCardsComponent } from './greek-flash-cards.component';

describe('GreekFlashCardsComponent', () => {
  let component: GreekFlashCardsComponent;
  let fixture: ComponentFixture<GreekFlashCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreekFlashCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreekFlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
