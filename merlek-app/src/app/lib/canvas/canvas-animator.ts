export abstract class CanvasAnimator {
  protected ctx: CanvasRenderingContext2D;
  constructor(protected canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
  }
  public abstract draw: (state?: any, ctx?: CanvasRenderingContext2D) => void;
  public clear(ctx: CanvasRenderingContext2D = this.ctx): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
