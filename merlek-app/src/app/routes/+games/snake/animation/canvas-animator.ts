export abstract class CanvasAnimator {
  protected ctx: CanvasRenderingContext2D;
  constructor(
    protected canvas: HTMLCanvasElement,
    protected state: { cols: number; rows: number }
  ) {
    this.ctx = canvas.getContext('2d');
  }
  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public clear(ctx: CanvasRenderingContext2D = this.ctx): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  protected x(x: number): number {
    return Math.round((x * this.canvas.width) / this.state.cols);
  }
  protected y(y: number): number {
    return Math.round((y * this.canvas.height) / this.state.rows);
  }
}
