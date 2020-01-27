import { Text, Animators } from 'canvas-tools';
import { TicTacToeAI } from '../core/tic-tac-toe-game-ai';
import {
  TicTacToeGameState,
  TicTacToeWinner
} from '../core/tic-tac-toe-game-state';
import { BACKGROUND_GRID_RATIO } from './background-animator';
import { getStrokeStyle, player } from './tic-tac-toe-animator';

export class TicTacToeUIAnimator extends Animators.CanvasGridAnimator {
  constructor(canvas: HTMLCanvasElement, grid: { cols: number; rows: number }) {
    super(canvas, grid);
  }
  public draw = (
    state: TicTacToeGameState,
    ctx: CanvasRenderingContext2D = this.ctx
  ) => {
    if (state.winner) {
      this.clear();
      this.drawText(
        ctx,
        state.winner,
        (state as TicTacToeAI).isAiTurn() ? 'human' : 'ai'
      );
    }
  };
  private drawText = (
    ctx: CanvasRenderingContext2D,
    winner: TicTacToeWinner,
    winnerPlayer: player,
    x = this.canvas.width / 2,
    y = this.canvas.height / 2,
    font = Text.getFont(this.y(1)),
    fillStyle = 'rgba(100,100,100,0.95)',
    textStyle = getStrokeStyle(winner === 'tie' ? 'tie' : winnerPlayer)
  ) => {
    ctx.save();

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, this.y(1), this.canvas.width, this.y(1));

    const text = winner === 'tie' ? 'tie!' : winner + ' wins!';

    const maxWidth = this.canvas.width * BACKGROUND_GRID_RATIO;

    Text.draw(ctx, { text, x, y, maxWidth, font, fillStyle: textStyle });

    ctx.restore();
  };
}
