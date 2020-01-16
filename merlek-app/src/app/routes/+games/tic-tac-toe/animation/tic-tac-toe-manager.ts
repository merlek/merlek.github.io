import { OnDestroy } from '@angular/core';
import { CanvasTools, ClickEventObject } from 'app/lib/canvas/canvas-tools';
import { TicTacToeGameState } from '../core/tic-tac-toe-game-state';
import { BackgroundAnimator } from './background-animator';
import { TicTacToeAnimator } from './tic-tac-toe-animator';
import { TicTacToeUIAnimator } from './tic-tac-toe-ui-animator';

export class TicTacToeManager implements OnDestroy {
  public fps = 60;
  private animationFrameId: number;
  private gameAnimator: TicTacToeAnimator;
  private backgroundAnimator: BackgroundAnimator;
  private uiAnimator: TicTacToeUIAnimator;

  constructor(
    game: HTMLCanvasElement,
    background: HTMLCanvasElement,
    ui: HTMLCanvasElement,
    public state = new TicTacToeGameState()
  ) {
    this.gameAnimator = new TicTacToeAnimator(game, state);
    this.backgroundAnimator = new BackgroundAnimator(background, state);
    this.uiAnimator = new TicTacToeUIAnimator(ui, state);

    const x = (i: number) => Math.round((i * ui.width) / this.state.cols);
    const y = (j: number) => Math.round((j * ui.height) / this.state.rows);

    const gridButtons: ClickEventObject[] = [];
    for (let i = 0; i < state.cols; i++) {
      for (let j = 0; j < state.rows; j++) {
        gridButtons.push({
          x: x(i),
          y: y(j),
          width: x(1),
          height: y(1),
          enabled: true,
          onClick: () => {
            this.state.setNextTurn(i, j);
          }
        });
      }
    }
    CanvasTools.addButtonClickEventListener(ui, gridButtons);
  }
  public start(): void {
    this.backgroundAnimator.draw();
    this.gameAnimator.draw(this.state);
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps) {
      this.gameAnimator.draw(this.state);

      if (this.state.winner) {
        this.uiAnimator.draw(this.state);
        this.state = this.state.next();
        setTimeout(() => {
          this.animationFrameId = window.requestAnimationFrame(this.update(t2));
        }, 2000);
      } else {
        this.uiAnimator.clear();
        this.animationFrameId = window.requestAnimationFrame(this.update(t2));
      }
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
