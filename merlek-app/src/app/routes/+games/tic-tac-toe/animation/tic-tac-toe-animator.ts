import { CanvasTools } from 'app/lib/canvas/canvas-tools';
import { Point } from 'app/lib/canvas/point';
import { CanvasAnimator } from '../../../../lib/canvas/canvas-animator';
import {
  TicTacToeGameState,
  TicTacToeMark
} from '../core/tic-tac-toe-game-state';
import { BACKGROUND_GRID_RATIO } from './background-animator';

const GRID_FILL_RATIO = BACKGROUND_GRID_RATIO;

export class TicTacToeAnimator extends CanvasAnimator {
  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);
  }
  public draw = (
    state: TicTacToeGameState,
    ctx: CanvasRenderingContext2D = this.ctx
  ) => {
    this.clear();

    ctx.lineWidth = this.canvas.width * 0.01;

    for (let x = 0; x < state.cols; x++) {
      for (let y = 0; y < state.rows; y++) {
        this.drawMarker(state.get(x, y))(ctx, x, y);
      }
    }
  };
  private drawMarker = (marker: TicTacToeMark) => {
    switch (marker) {
      case 'X':
        return this.drawMarkerX;
      case 'O':
        return this.drawMarkerO;
      default:
        return () => {};
    }
  };
  private drawMarkerX = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    strokeStyle = 'white'
  ) => {
    ctx.save();

    const w = this.x(1);
    const h = this.y(1);

    const xOffset = (this.canvas.width * (1 - GRID_FILL_RATIO)) / 2;
    const yOffset = (this.canvas.height * (1 - GRID_FILL_RATIO)) / 2;

    ctx.strokeStyle = strokeStyle;

    CanvasTools.drawLine(
      ctx,
      new Point(this.x(x) + xOffset, this.y(y) + yOffset),
      new Point(this.x(x) + w - xOffset, this.y(y) + h - yOffset)
    );

    CanvasTools.drawLine(
      ctx,
      new Point(this.x(x) + xOffset, this.y(y) + h - yOffset),
      new Point(this.x(x) + w - xOffset, this.y(y) + yOffset)
    );

    ctx.restore();
  };
  private drawMarkerO = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    strokeStyle = 'white'
  ) => {
    ctx.save();
    const w = this.x(1);
    const h = this.y(1);

    const xOffset = (this.canvas.width * (1 - GRID_FILL_RATIO)) / 2;
    const yOffset = (this.canvas.height * (1 - GRID_FILL_RATIO)) / 2;

    const r =
      (Math.min(w, h) * GRID_FILL_RATIO - Math.min(xOffset, yOffset)) / 2;

    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(this.x(x) + w / 2, this.y(y) + h / 2, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  };
}
