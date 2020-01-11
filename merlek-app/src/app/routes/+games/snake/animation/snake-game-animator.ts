import { Directions } from '../core/point';
import { SnakeGameState } from '../core/snake-game-state';
import { SnakeAnimator } from './snake-animator';
import { CanvasTools } from './canvas-tools';

export class SnakeGameAnimator {
  static readonly APPLE_COLOR = '#ff3200';
  static readonly BACKGROUND_COLOR = '#232323';
  static readonly CRASH_COLOR = 'rgb(255,0,0)';
  public fps = 10;
  public paused = false;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly uiCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context

  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private animationFrameId: number;
  private snakeAnimator: SnakeAnimator;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    uiCanvas: HTMLCanvasElement,
    public state: SnakeGameState = new SnakeGameState(true)
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d', { alpha: false });
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameCtx = gameCanvas.getContext('2d');
    this.uiCtx = uiCanvas.getContext('2d');

    this.snakeAnimator = new SnakeAnimator(
      this.canvasWidth,
      this.canvasHeight,
      this.state.cols,
      this.state.rows
    );
  }
  public start(): void {
    this.drawBackground();
    this.drawGame();
    this.pause();
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps) {
      if (!this.paused) {
        this.state = this.state.next();
        this.drawGame();
      }

      this.animationFrameId = window.requestAnimationFrame(this.update(t2));
    } else {
      this.animationFrameId = window.requestAnimationFrame(this.update(t1));
    }
  }
  private drawGame(ctx: CanvasRenderingContext2D = this.gameCtx): void {
    this.clearDrawing(ctx);
    this.snakeAnimator.drawSnakes(ctx, this.state);
    this.drawApple(ctx, this.state);
    if (this.state.isCrash()) {
      this.drawCrash(ctx);
    }
  }
  private clearDrawing(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  private drawApple(ctx: CanvasRenderingContext2D, state: SnakeGameState) {
    ctx.fillStyle = SnakeGameAnimator.APPLE_COLOR;
    CanvasTools.drawRoundedRect(
      ctx,
      this.x(state.apple.x),
      this.y(state.apple.y),
      this.x(1),
      this.y(1)
    );
  }
  private drawPaused(ctx: CanvasRenderingContext2D = this.uiCtx) {
    ctx.save();

    const x = this.canvasWidth / 2;
    const y = this.canvasHeight / 2;

    const w = this.canvasWidth / 4;
    const h = this.canvasHeight / 8;

    ctx.globalAlpha = 0.5;

    ctx.fillStyle = 'grey'; // SnakeAnimator.BACKGROUND_COLOR;
    CanvasTools.drawRoundedRect(ctx, x - w / 2, y - h / 2, w, h);

    ctx.globalAlpha = 1;

    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Paused', x, y);

    ctx.restore();
  }
  private drawCrash(ctx: CanvasRenderingContext2D) {
    this.drawBackground(ctx, SnakeGameAnimator.CRASH_COLOR);
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
  public destroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
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
  private x(x: number) {
    return Math.round((x * this.canvasWidth) / this.state.cols);
  }
  private y(y: number) {
    return Math.round((y * this.canvasHeight) / this.state.rows);
  }
  public pause() {
    if ((this.paused = !this.paused)) {
      this.drawPaused();
    } else {
      this.clearDrawing(this.uiCtx);
    }
  }
  public toggleTwoPlayers() {
    this.state = new SnakeGameState(!this.state.isTwoPlayers);
    this.drawGame();
  }
}
