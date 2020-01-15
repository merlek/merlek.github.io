import { CanvasAnimator } from '../../../../lib/canvas/canvas-animator';

export class TicTacToeAnimator extends CanvasAnimator {
  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);
  }
  public draw = (ctx: CanvasRenderingContext2D = this.ctx) => {
    this.clear();
  };
}
