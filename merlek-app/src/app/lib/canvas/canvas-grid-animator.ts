import { CanvasAnimator } from './canvas-animator';

export abstract class CanvasGridAnimator extends CanvasAnimator {
  protected ctx: CanvasRenderingContext2D;
  constructor(
    protected canvas: HTMLCanvasElement,
    protected grid: { cols: number; rows: number }
  ) {
    super(canvas);
  }
  protected x(x: number): number {
    return Math.round((x * this.canvas.width) / this.grid.cols);
  }
  protected y(y: number): number {
    return Math.round((y * this.canvas.height) / this.grid.rows);
  }
}
