import { Directions } from '../core/point';
import { SnakeGameState } from '../core/snake-game-state';
import { BackgroundAnimator } from './background-animator';
import { PauseMenuAnimator } from './pause-menu-animator';
import { SnakeGameAnimator } from './snake-game-animator';
import { OnDestroy } from '@angular/core';

export class SnakeGameManager implements OnDestroy {
  public fps = 10;
  public paused = false;
  private animationFrameId: number;
  private gameAnimator: SnakeGameAnimator;
  private pauseMenuAnimator: PauseMenuAnimator;
  private backgroundAnimator: BackgroundAnimator;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    uiCanvas: HTMLCanvasElement,
    public state: SnakeGameState = new SnakeGameState(true)
  ) {
    this.gameAnimator = new SnakeGameAnimator(gameCanvas, state);
    this.pauseMenuAnimator = new PauseMenuAnimator(uiCanvas, state, () => {
      this.pause();
    });
    this.backgroundAnimator = new BackgroundAnimator(backgroundCanvas, state);
  }
  public start(): void {
    this.backgroundAnimator.draw();
    this.gameAnimator.draw(this.state);
    this.pause();
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps) {
      if (!this.paused) {
        this.state = this.state.next();
        this.gameAnimator.draw(this.state);
        // this.pauseMenuAnimator.clear();
      } else {
        this.pauseMenuAnimator.draw();
      }

      this.animationFrameId = window.requestAnimationFrame(this.update(t2));
    } else {
      this.animationFrameId = window.requestAnimationFrame(this.update(t1));
    }
  }
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.pauseMenuAnimator.ngOnDestroy();
    }
  }
  public keyEvent(key: string): boolean {
    switch (key) {
      // Game state
      case ' ':
        this.pause();
        return true;
      // Player one
      case 'w':
        this.state = this.state.enqueue(0, Directions.NORTH);
        return true;
      case 'a':
        this.state = this.state.enqueue(0, Directions.WEST);
        return true;
      case 's':
        this.state = this.state.enqueue(0, Directions.SOUTH);
        return true;
      case 'd':
        this.state = this.state.enqueue(0, Directions.EAST);
        return true;
      // Player two
      case 'i':
      case 'ArrowUp':
        this.state = this.state.enqueue(1, Directions.NORTH);
        return true;
      case 'j':
      case 'ArrowLeft':
        this.state = this.state.enqueue(1, Directions.WEST);
        return true;
      case 'k':
      case 'ArrowDown':
        this.state = this.state.enqueue(1, Directions.SOUTH);
        return true;
      case 'l':
      case 'ArrowRight':
        this.state = this.state.enqueue(1, Directions.EAST);
        return true;
    }
    return false;
  }
  public pause() {
    if ((this.paused = !this.paused)) {
      this.pauseMenuAnimator.show();
    } else {
      this.pauseMenuAnimator.hide();
    }
  }
  public toggleTwoPlayers() {
    this.gameAnimator.draw(
      (this.state = new SnakeGameState(!this.state.isTwoPlayers))
    );
  }
}
