import { SnakeGameState } from '../core/snake-game-state';
import { CanvasAnimator } from '../../../../lib/canvas/canvas-animator';
import { CanvasTools } from '../../../../lib/canvas/canvas-tools';
import { SnakeAnimator } from './snake-animator';

export class SnakeGameAnimator extends CanvasAnimator {
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
      CanvasTools.drawRoundedRect(
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
