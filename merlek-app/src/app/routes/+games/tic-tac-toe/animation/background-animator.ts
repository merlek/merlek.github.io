import { Line, Point, Animators } from 'canvas-tools';

export const BACKGROUND_GRID_RATIO = 0.9;

export class BackgroundAnimator extends Animators.CanvasGridAnimator {
  static readonly BACKGROUND_COLOR = '#232323';

  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);
  }
  public draw = (ctx: CanvasRenderingContext2D = this.ctx) => {
    ctx.save();

    ctx.fillStyle = BackgroundAnimator.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw grid
    ctx.lineWidth = this.canvas.width * 0.01;

    ctx.strokeStyle = 'rgb(200,200,200)';

    const yOffset = (this.canvas.height * (1 - BACKGROUND_GRID_RATIO)) / 2;
    for (let x = 1; x < this.grid.cols; x++) {
      Line.draw(ctx, {
        start: Point.create(
          this.x(x),
          this.y(0) * BACKGROUND_GRID_RATIO + yOffset
        ),
        end: Point.create(
          this.x(x),
          this.y(this.grid.rows) * BACKGROUND_GRID_RATIO + yOffset
        )
      });
    }

    const xOffset = (this.canvas.width * (1 - BACKGROUND_GRID_RATIO)) / 2;
    for (let y = 1; y < this.grid.cols; y++) {
      Line.draw(ctx, {
        start: Point.create(
          this.x(0) * BACKGROUND_GRID_RATIO + xOffset,
          this.y(y)
        ),
        end: Point.create(
          this.x(this.grid.rows) * BACKGROUND_GRID_RATIO + xOffset,
          this.y(y)
        )
      });
    }

    ctx.restore();
  };
}
