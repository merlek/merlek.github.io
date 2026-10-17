import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnakeModule } from '../snake.module';
import { SnakeComponent } from './snake.component';

describe('SnakeComponent', () => {
  let component: SnakeComponent;
  let fixture: ComponentFixture<SnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeModule]
    }).compileComponents();
    fixture = TestBed.createComponent(SnakeComponent);
    component = fixture.componentInstance;
    // Canvas initialization and rendering are exercised in the real browser checks.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
