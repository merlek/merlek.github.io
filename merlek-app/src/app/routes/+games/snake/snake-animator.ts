import { SnakeGameState } from './snake-game-state';
import { Directions, Point } from './point';
import { Snake } from './snake';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface RoundedRectRadius {
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
}

export class SnakeAnimator {
  static readonly SNAKE_COLORS = ['#00c832', '#c7c700'];
  static readonly APPLE_COLOR = '#ff3200';
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
      if (s.isAlive()) {
        // ctx.fillStyle = SnakeAnimator.SNAKE_COLORS[i];
        ctx.strokeStyle = SnakeAnimator.SNAKE_COLORS[i];
        // this.drawSnake2(ctx, s);
        this.drawSnake(ctx, s);
      }
    });
    ctx.restore();
  }
  private drawSnake(ctx: CanvasRenderingContext2D, snake: Snake) {
    snake.segments().forEach(this.drawSnakeSegment(ctx));
    this.drawSnakeHead(ctx, snake);
  }
  private drawSnakeHead(ctx: CanvasRenderingContext2D, snake: Snake) {
    ctx.save();

    const head = snake.snake[0];

    ctx.translate(
      this.x(head.x) + this.x(1) / 2,
      this.y(head.y) + this.y(1) / 2
    );
    ctx.rotate((Math.PI / 180) * snake.direction());

    const x = 0 + (this.x(1) * 3) / 16;
    const y = 0;
    const dy = (this.y(1) * 3) / 16;

    ctx.fillStyle = 'white';

    let size = Math.min(this.x(1), this.y(1)) / 8;

    ctx.beginPath();
    ctx.arc(x, y - dy, size, 0, Math.PI * 2); // Left eye
    ctx.arc(x, y + dy, size, 0, Math.PI * 2); // Right eye
    ctx.fill();

    ctx.fillStyle = 'black';
    size = size / 2;

    ctx.beginPath();
    ctx.arc(x + size, y - dy, size, 0, Math.PI * 2); // Left eye
    ctx.arc(x + size, y + dy, size, 0, Math.PI * 2); // Right eye
    ctx.fill();

    ctx.restore();
  }
  private drawSnakeSegment = (ctx: CanvasRenderingContext2D) => (
    points: Point[]
  ) => {
    ctx.save();

    ctx.lineWidth = Math.min(this.x(1), this.y(1));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const start = points.shift();

    ctx.moveTo(
      this.x(start.x) + this.x(1) / 2,
      this.y(start.y) + this.y(1) / 2
    );

    ctx.beginPath();
    ctx.lineTo(
      this.x(start.x) + this.x(1) / 2,
      this.y(start.y) + this.y(1) / 2
    );

    points.forEach(point => {
      ctx.lineTo(
        this.x(point.x) + this.x(1) / 2,
        this.y(point.y) + this.y(1) / 2
      );
    });

    ctx.stroke();

    ctx.restore();
  }
  private drawApple(ctx: CanvasRenderingContext2D, state: SnakeGameState) {
    ctx.fillStyle = SnakeAnimator.APPLE_COLOR;
    this.drawRoundedRect(
      ctx,
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
    this.drawRoundedRect(ctx, x - w / 2, y - h / 2, w, h);

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

    // draw grid

    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);

    // for (let x = 0; x < this.canvasWidth; x++) {
    //   for (let y = 0; y < this.canvasHeight; y++) {
    //     ctx.strokeRect(this.x(x), this.y(y), this.x(1), this.y(1));
    //   }
    // }
  }
  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | RoundedRectRadius = 10,
    fill = true,
    stroke = false
  ) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (const key of Object.keys(defaultRadius)) {
        radius[key] = radius[key] || defaultRadius[key];
      }
    }
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
  public destroy(): void {
    if (this.animationFrameId) {
    }
    {
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
