import { SnakeGameState } from '../core/snake-game-state';
import { CanvasAnimator } from './canvas-animator';
import { CanvasTools } from './canvas-tools';
import { SnakeAnimator } from './snake-animator';

export class SnakeGameAnimator extends CanvasAnimator {
  static readonly APPLE_COLOR = '#ff3200';
  static readonly CRASH_COLOR = 'rgb(255,0,0)';
  private snakeAnimator: SnakeAnimator;
  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);

    this.snakeAnimator = new SnakeAnimator(
      this.canvas.width,
      this.canvas.height,
      this.grid.cols,
      this.grid.rows
    );
  }
  public draw = (ctx: CanvasRenderingContext2D = this.ctx) => (
    state: SnakeGameState
  ) => {
    this.clear();
    this.snakeAnimator.drawSnakes(ctx, state);
    this.drawApple(ctx)(state);
    if (state.isCrash()) {
      this.drawCrash(ctx);
    }
  }
  private drawApple = (ctx: CanvasRenderingContext2D = this.ctx) => (
    state: SnakeGameState
  ) => {
    ctx.fillStyle = SnakeGameAnimator.APPLE_COLOR;
    CanvasTools.drawRoundedRect(
      ctx,
      this.x(state.apple.x),
      this.y(state.apple.y),
      this.x(1),
      this.y(1)
    );
  }
  private drawCrash(ctx: CanvasRenderingContext2D = this.ctx) {
    ctx.fillStyle = SnakeGameAnimator.CRASH_COLOR;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
