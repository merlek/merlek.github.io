import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistanceComponent } from './edit-distance.component';

describe('EditDistanceComponent', () => {
  let component: EditDistanceComponent;
  let fixture: ComponentFixture<EditDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
