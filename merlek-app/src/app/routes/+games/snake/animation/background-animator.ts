import { CanvasAnimator } from './canvas-animator';

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

    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);

    // for (let x = 0; x < this.canvasWidth; x++) {
    //   for (let y = 0; y < this.canvasHeight; y++) {
    //     ctx.strokeRect(this.x(x), this.y(y), this.x(1), this.y(1));
    //   }
    // }

    ctx.restore();
  }
}
