import { CanvasGridAnimator } from 'app/lib/canvas/canvas-grid-animator';
import { RoundedRect } from 'app/lib/canvas/Canvas-Tools';
import { SnakeGameState } from '../core/snake-game-state';
import { SnakeAnimator } from './snake-animator';

export class SnakeGameAnimator extends CanvasGridAnimator {
  static readonly APPLE_COLOR = '#ff3200';
  static readonly CRASH_COLOR = 'rgb(255,0,0)';
  private snakeAnimator: SnakeAnimator;
  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);
    this.snakeAnimator = new SnakeAnimator(canvas, grid);
  }
  public draw = (
    state: SnakeGameState,
    ctx: CanvasRenderingContext2D = this.ctx
  ) => {
    this.clear();
    this.snakeAnimator.draw()(state);
    this.drawApple(ctx)(state);
    if (state.isCrash()) {
      this.drawCrash(ctx);
    }
  };
  private drawApple = (ctx: CanvasRenderingContext2D = this.ctx) => (
    state: SnakeGameState
  ) => {
    ctx.save();

    ctx.fillStyle = SnakeGameAnimator.APPLE_COLOR;
    state.apples.forEach(apple => {
      RoundedRect.draw(
        ctx,
        this.x(apple.x),
        this.y(apple.y),
        this.x(1),
        this.y(1)
      );
    });

    ctx.restore();
  };
  private drawCrash(ctx: CanvasRenderingContext2D = this.ctx) {
    ctx.fillStyle = SnakeGameAnimator.CRASH_COLOR;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
