import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicTacToeModule } from '../tic-tac-toe.module';
import { TicTacToeComponent } from './tic-tac-toe.component';

describe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicTacToeModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    // Canvas initialization and rendering are exercised in the real browser checks.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
