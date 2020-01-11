import { Directions } from '../core/point';
import { SnakeGameState } from '../core/snake-game-state';
import { PauseMenuAnimator } from './pause-menu-animator';
import { SnakeGameAnimator } from './snake-game-animator';

export class SnakeGameManager {
  public fps = 10;
  public paused = false;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private animationFrameId: number;
  private gameAnimator: SnakeGameAnimator;
  private pauseMenuAnimator: PauseMenuAnimator;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    uiCanvas: HTMLCanvasElement,
    public state: SnakeGameState = new SnakeGameState(true)
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d', { alpha: false });
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameAnimator = new SnakeGameAnimator(gameCanvas, state);
    this.pauseMenuAnimator = new PauseMenuAnimator(uiCanvas, this.state, () => {
      this.pause();
    });
  }
  public start(): void {
    this.drawBackground();
    this.gameAnimator.draw()(this.state);
    this.pause();
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps) {
      if (!this.paused) {
        this.state = this.state.next();
        this.gameAnimator.draw()(this.state);
        this.pauseMenuAnimator.clear();
      } else {
        this.pauseMenuAnimator.draw();
      }

      this.animationFrameId = window.requestAnimationFrame(this.update(t2));
    } else {
      this.animationFrameId = window.requestAnimationFrame(this.update(t1));
    }
  }
  public destroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }
  drawBackground(
    ctx: CanvasRenderingContext2D = this.backgroundCtx,
    color: string = SnakeGameAnimator.BACKGROUND_COLOR
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // draw grid

    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);

    // for (let x = 0; x < this.canvasWidth; x++) {
    //   for (let y = 0; y < this.canvasHeight; y++) {
    //     ctx.strokeRect(this.x(x), this.y(y), this.x(1), this.y(1));
    //   }
    // }
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
    this.paused = !this.paused;
  }
  public toggleTwoPlayers() {
    this.state = new SnakeGameState(!this.state.isTwoPlayers);
    this.gameAnimator.draw();
  }
}
