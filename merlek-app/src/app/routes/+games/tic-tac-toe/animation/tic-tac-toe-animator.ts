import { Line, Point, Animators } from 'canvas-tools';
import { TicTacToeAI } from '../core/tic-tac-toe-game-ai';
import {
  TicTacToeGameState,
  TicTacToeMark
} from '../core/tic-tac-toe-game-state';
import { BACKGROUND_GRID_RATIO } from './background-animator';

const GRID_FILL_RATIO = BACKGROUND_GRID_RATIO;

export type player = 'human' | 'ai';

export const getStrokeStyle = (mode: player | 'tie') =>
  mode === 'human' ? '#33ff33' : mode === 'ai' ? '#ff3333' : 'white';

export const determineMode = (state: TicTacToeGameState) => {
  if (state instanceof TicTacToeAI) {
    return (marker: TicTacToeMark) =>
      marker === ((state as TicTacToeAI).aiPlayer ? 'O' : 'X') ? 'ai' : 'human';
  } else {
    return () => undefined;
  }
};

export class TicTacToeAnimator extends Animators.CanvasGridAnimator {
  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);
  }
  public draw = (
    state: TicTacToeGameState,
    ctx: CanvasRenderingContext2D = this.ctx
  ) => {
    this.clear();

    const mode = determineMode(state);

    ctx.lineWidth = this.canvas.width * 0.01;

    for (let x = 0; x < state.cols; x++) {
      for (let y = 0; y < state.rows; y++) {
        const marker = state.get({ x, y });
        this.drawMarker(marker, mode(marker))(ctx, x, y);
      }
    }
  };
  private drawMarker = (marker: TicTacToeMark, mode: player) => {
    switch (marker) {
      case 'X':
        return this.drawMarkerX(mode);
      case 'O':
        return this.drawMarkerO(mode);
      default:
        return () => {};
    }
  };
  private drawMarkerX = (mode: player) => (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    strokeStyle = getStrokeStyle(mode)
  ) => {
    ctx.save();

    const w = this.x(1);
    const h = this.y(1);

    const xOffset = (this.canvas.width * (1 - GRID_FILL_RATIO)) / 2;
    const yOffset = (this.canvas.height * (1 - GRID_FILL_RATIO)) / 2;

    ctx.strokeStyle = strokeStyle;

    Line.draw(ctx, {
      start: Point.create(this.x(x) + xOffset, this.y(y) + yOffset),
      end: Point.create(this.x(x) + w - xOffset, this.y(y) + h - yOffset)
    });

    Line.draw(ctx, {
      start: Point.create(this.x(x) + xOffset, this.y(y) + h - yOffset),
      end: Point.create(this.x(x) + w - xOffset, this.y(y) + yOffset)
    });

    ctx.restore();
  };
  private drawMarkerO = (mode: player) => (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    strokeStyle = getStrokeStyle(mode)
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
