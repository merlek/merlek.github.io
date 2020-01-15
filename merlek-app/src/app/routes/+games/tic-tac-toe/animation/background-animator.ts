import { CanvasAnimator } from '../../../../lib/canvas/canvas-animator';
import { Point } from '../../../../lib/canvas/point';

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

    ctx.strokeStyle = 'white';

    const yOffset = (this.canvas.height * (1 - BACKGROUND_GRID_RATIO)) / 2;
    for (let x = 1; x < this.grid.cols; x++) {
      this.drawLine(ctx)(
        new Point(this.x(x), this.y(0) * BACKGROUND_GRID_RATIO + yOffset),
        new Point(
          this.x(x),
          this.y(this.grid.rows) * BACKGROUND_GRID_RATIO + yOffset
        )
      );
    }

    const xOffset = (this.canvas.width * (1 - BACKGROUND_GRID_RATIO)) / 2;
    for (let y = 1; y < this.grid.cols; y++) {
      this.drawLine(ctx)(
        new Point(this.x(0) * BACKGROUND_GRID_RATIO + xOffset, this.y(y)),
        new Point(
          this.x(this.grid.rows) * BACKGROUND_GRID_RATIO + xOffset,
          this.y(y)
        )
      );
    }

    ctx.restore();
  };
  private drawLine = (ctx: CanvasRenderingContext2D = this.ctx) => (
    p1: Point,
    p2: Point
  ) => {
    console.log(p1, p2, p1.distance(p2));
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
  };
}
