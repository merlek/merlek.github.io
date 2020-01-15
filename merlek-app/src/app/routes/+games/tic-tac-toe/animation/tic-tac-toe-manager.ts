import { OnDestroy } from '@angular/core';
import { BackgroundAnimator } from './background-animator';
import { TicTacToeAnimator } from './tic-tac-toe-animator';

export class TicTacToeManager implements OnDestroy {
  public fps = 10;
  private animationFrameId: number;
  private gameAnimator: TicTacToeAnimator;
  private backgroundAnimator: BackgroundAnimator;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    uiCanvas: HTMLCanvasElement
  ) {
    const state = { rows: 3, cols: 3 };
    this.gameAnimator = new TicTacToeAnimator(gameCanvas, state);
    this.backgroundAnimator = new BackgroundAnimator(backgroundCanvas, state);
  }
  public start(): void {
    this.backgroundAnimator.draw();
    this.gameAnimator.draw();
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps) {
      // this.state = this.state.next();
      this.gameAnimator.draw();

      this.animationFrameId = window.requestAnimationFrame(this.update(t2));
    } else {
      this.animationFrameId = window.requestAnimationFrame(this.update(t1));
    }
  };
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }
}
