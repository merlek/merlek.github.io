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
  private readonly uiCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context

  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private animationFrameId: number;
  public paused = false;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    uiCanvas: HTMLCanvasElement,
    public state: SnakeGameState = new SnakeGameState()
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d', { alpha: false });
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameCtx = gameCanvas.getContext('2d');
    this.uiCtx = uiCanvas.getContext('2d');
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
    this.drawSnakes(ctx, this.state);
    this.drawApple(ctx, this.state);
    if (this.state.isCrash()) {
      this.drawCrash(ctx);
    }
  }
  private clearDrawing(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
  private drawCrash(ctx: CanvasRenderingContext2D) {
    this.drawBackground(ctx, SnakeAnimator.CRASH_COLOR);
  }
  private drawPaused(ctx: CanvasRenderingContext2D = this.uiCtx) {
    ctx.save();

    const x = this.canvasWidth / 2;
    const y = this.canvasHeight / 2;

    const w = this.canvasWidth / 4;
    const h = this.canvasHeight / 8;

    ctx.globalAlpha = 0.5;

    ctx.fillStyle = 'grey'; // SnakeAnimator.BACKGROUND_COLOR;
    this.fillRoundedRect(ctx, x - w / 2, y - h / 2, w, h);

    ctx.globalAlpha = 1;

    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Paused', x, y);

    ctx.restore();
  }
  drawBackground(
    ctx: CanvasRenderingContext2D = this.backgroundCtx,
    color: string = SnakeAnimator.BACKGROUND_COLOR
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  private fillRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius = 10
  ) {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fill();

    ctx.restore();
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
