import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TowerOfHanoiModule } from '../tower-of-hanoi.module';
import { TowerOfHanoiComponent } from './tower-of-hanoi.component';

describe('TowerOfHanoiComponent', () => {
  let component: TowerOfHanoiComponent;
  let fixture: ComponentFixture<TowerOfHanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TowerOfHanoiModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TowerOfHanoiComponent);
    component = fixture.componentInstance;
    // Canvas initialization and rendering are exercised in the real browser checks.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
