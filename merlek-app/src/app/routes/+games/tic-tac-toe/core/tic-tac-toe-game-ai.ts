import { rnd } from 'app/lib/helpers';
import { IPoint, Point } from '../../../../lib/canvas/point';
import {
  TicTacToeGameState,
  TicTacToeWinner,
  TicTacToeMark
} from './tic-tac-toe-game-state';

export class TicTacToeAI extends TicTacToeGameState {
  constructor(cols: number = 3, rows: number = 3, private isAiTurn = false) {
    super(cols, rows);
    (window as any).TicTacToeAI = this;
  }

  public takeTurn(p?: IPoint): void {
    if (this.isAiTurn && !this.checkWinner()) {
      while (!this.setNextTurn(this.getNextMove())) {}
      this.bestMove();
      this.checkWinner();
      this.isAiTurn = false;
    } else {
      this.isAiTurn = this.setNextTurn(p);
    }
  }
  public getNextMove(): Point {
    return this.bestMove();
  }
  public getAvailableMoves(): Point[] {
    const moves: Point[] = [];
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (!this.get({ x, y })) {
          moves.push(new Point(x, y));
        }
      }
    }
    return moves;
  }
  public next = () => new TicTacToeAI(this.cols, this.rows);

  private bestMove(): Point {
    return this.minimax().move;
  }
  private minimax(
    state: TicTacToeAI = this,
    scores: (i: TicTacToeWinner) => number = (t: TicTacToeWinner) => {
      return t === 'tie' ? 0 : t === this.getTurn() ? 10 : -10;
    },
    player: (isMaximizing: boolean) => TicTacToeMark = (isMaxing: boolean) => {
      return isMaxing ? this.getTurn() : this.getTurn(this.turns + 1);
    },
    depth: number = 0,
    isMaximizing: boolean = true
  ): { score: number; move?: Point } {
    const result = state.checkWinner(false);
    if (result !== undefined) {
      return { score: scores(result) };
    }

    const moves = state.getAvailableMoves();

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove: Point;

    moves.forEach(move => {
      state.set(move, player(isMaximizing));
      const { score } = this.minimax(
        state,
        scores,
        player,
        depth + 1,
        !isMaximizing
      );
      state.set(move, undefined);

      bestScore = isMaximizing
        ? Math.max(score, bestScore)
        : Math.min(score, bestScore);
      if (bestScore === score) {
        bestMove = move;
      }
    });
    return { score: bestScore, move: bestMove };
  }
}
