import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDistanceModule } from '../edit-distance.module';
import { EditDistanceComponent } from './edit-distance.component';

describe('EditDistanceComponent', () => {
  let component: EditDistanceComponent;
  let fixture: ComponentFixture<EditDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDistanceModule]
    }).compileComponents();
    fixture = TestBed.createComponent(EditDistanceComponent);
    component = fixture.componentInstance;
    // Canvas initialization and rendering are exercised in the real browser checks.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
