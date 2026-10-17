import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NQueensModule } from '../n-queens.module';
import { NQueensComponent } from './n-queens.component';

describe('NQueensComponent', () => {
  let component: NQueensComponent;
  let fixture: ComponentFixture<NQueensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NQueensModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NQueensComponent);
    component = fixture.componentInstance;
    // Canvas initialization and rendering are exercised in the real browser checks.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
