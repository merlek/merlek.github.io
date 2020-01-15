import { CanvasAnimator } from '../../../../lib/canvas/canvas-animator';
import { Point } from '../../../../lib/canvas/point';
import { CanvasTools } from 'app/lib/canvas/canvas-tools';

const BACKGROUND_GRID_RATIO = 0.9;

export class BackgroundAnimator extends CanvasAnimator {
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
      CanvasTools.drawLine(
        ctx,
        new Point(this.x(x), this.y(0) * BACKGROUND_GRID_RATIO + yOffset),
        new Point(
          this.x(x),
          this.y(this.grid.rows) * BACKGROUND_GRID_RATIO + yOffset
        )
      );
    }

    const xOffset = (this.canvas.width * (1 - BACKGROUND_GRID_RATIO)) / 2;
    for (let y = 1; y < this.grid.cols; y++) {
      CanvasTools.drawLine(
        ctx,
        new Point(this.x(0) * BACKGROUND_GRID_RATIO + xOffset, this.y(y)),
        new Point(
          this.x(this.grid.rows) * BACKGROUND_GRID_RATIO + xOffset,
          this.y(y)
        )
      );
    }

    ctx.restore();
  };
}
