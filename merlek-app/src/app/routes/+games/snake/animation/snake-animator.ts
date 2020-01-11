import { Point } from '../core/point';
import { Snake } from '../core/snake';
import { SnakeGameState } from '../core/snake-game-state';

interface RoundedRectRadius {
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
}

export class SnakeAnimator {
  static readonly SNAKE_COLORS = ['#00c832', '#c7c700'];
  constructor(
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
    private readonly gameCols: number,
    private readonly gameRows: number
  ) {}

  public drawSnakes(ctx: CanvasRenderingContext2D, state: SnakeGameState) {
    ctx.save();
    state.snakes.forEach((s, i) => {
      if (s.isAlive()) {
        ctx.strokeStyle = SnakeAnimator.SNAKE_COLORS[i];
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
  private x(x: number) {
    return Math.round((x * this.canvasWidth) / this.gameCols);
  }
  private y(y: number) {
    return Math.round((y * this.canvasHeight) / this.gameRows);
  }
}
