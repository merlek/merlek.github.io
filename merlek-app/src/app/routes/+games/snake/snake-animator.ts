import { SnakeGameState } from './snake-game-state';
import { Directions } from './point';
import { Snake } from './snake';

export class SnakeAnimator {
  static readonly SNAKE_COLORS = ['rgb(0,200,50)', 'rgb(250,250,0)'];
  static readonly APPLE_COLOR = 'rgb(255,50,0)';
  static readonly BACKGROUND_COLOR = '#232323';
  static readonly CRASH_COLOR = 'rgb(255,0,0)';
  public fps = 10;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private animationFrameId: number;
  public paused = false;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    public state: SnakeGameState = new SnakeGameState()
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d');
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameCtx = gameCanvas.getContext('2d');
  }
  public start(): void {
    this.draw();
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps && !this.paused) {
      this.state = this.state.next();
      this.draw();
      this.animationFrameId = window.requestAnimationFrame(this.update(t2));
    } else {
      this.animationFrameId = window.requestAnimationFrame(this.update(t1));
    }
  }
  private draw(): void {
    this.clearDrawing(this.gameCtx);
    this.drawSnakes(this.gameCtx, this.state);
    this.drawApple(this.gameCtx, this.state);
    this.drawCrash(this.gameCtx, this.state);
  }
  private clearDrawing(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = SnakeAnimator.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  private drawSnakes(ctx: CanvasRenderingContext2D, state: SnakeGameState) {
    ctx.save();
    state.snakes.forEach((s, i) => {
      ctx.fillStyle = SnakeAnimator.SNAKE_COLORS[i];
      this.drawSnake(ctx, s);
    });
    ctx.restore();
  }
  private drawSnake(ctx: CanvasRenderingContext2D, snake: Snake) {
    snake.snake.forEach(point =>
      ctx.fillRect(this.x(point.x), this.y(point.y), this.x(1), this.y(1))
    );
  }
  private drawApple(ctx: CanvasRenderingContext2D, state: SnakeGameState) {
    ctx.fillStyle = SnakeAnimator.APPLE_COLOR;
    ctx.fillRect(
      this.x(state.apple.x),
      this.y(state.apple.y),
      this.x(1),
      this.y(1)
    );
  }
  private drawCrash(ctx: CanvasRenderingContext2D, state: SnakeGameState) {
    if (state.isCrash()) {
      ctx.fillStyle = SnakeAnimator.CRASH_COLOR;
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }
  public destroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }
  public keyEvent(key: string): void {
    switch (key) {
      // Game state
      case ' ':
        this.pause();
        break;
      // Player one
      case 'w':
        this.state = this.state.enqueue(0, Directions.NORTH);
        break;
      case 'a':
        this.state = this.state.enqueue(0, Directions.WEST);
        break;
      case 's':
        this.state = this.state.enqueue(0, Directions.SOUTH);
        break;
      case 'd':
        this.state = this.state.enqueue(0, Directions.EAST);
        break;
      // Player two
      case 'h':
      case 'ArrowUp':
        this.state = this.state.enqueue(1, Directions.NORTH);
        break;
      case 'j':
      case 'ArrowLeft':
        this.state = this.state.enqueue(1, Directions.WEST);
        break;
      case 'k':
      case 'ArrowDown':
        this.state = this.state.enqueue(1, Directions.SOUTH);
        break;
      case 'l':
      case 'ArrowRight':
        this.state = this.state.enqueue(1, Directions.EAST);
        break;
    }
  }
  private x(x: number) {
    return Math.round((x * this.canvasWidth) / this.state.cols);
  }
  private y(y: number) {
    return Math.round((y * this.canvasHeight) / this.state.rows);
  }
  public pause() {
    this.paused = !this.paused;
  }
}
