import { IPoint, Point } from '../../../../lib/canvas/point';
import { TicTacToeGameState, TicTacToeWinner } from './tic-tac-toe-game-state';
import { rnd } from 'app/lib/helpers';

export class TicTacToeAI extends TicTacToeGameState {
  constructor(
    cols: number = 3,
    rows: number = 3,
    private isAiTurn = rnd(0)(2) === 0
  ) {
    super(cols, rows);
  }
  public takeTurn(p?: IPoint): void {
    if (this.isAiTurn && !this.checkWinner()) {
      // setTimeout(() => {
      while (!this.setNextTurn(this.bestMove())) {}
      // }, 1000);
      this.checkWinner();
      this.isAiTurn = false;
    } else {
      this.isAiTurn = this.setNextTurn(p);
    }
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
  private bestMove = () => this.minimax().move;
  private minimax(
    state: TicTacToeAI = this,
    depth: number = 0,
    isMaximizing: boolean = true
  ): { score: number; move?: Point } {
    const result = state.checkWinner(false);
    if (result !== undefined) {
      return { score: this.scores(result, depth) };
    }

    const moves = state.getAvailableMoves();

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove: Point;

    moves.forEach(move => {
      state.set(move, this.player(isMaximizing));
      const { score } = this.minimax(state, depth + 1, !isMaximizing);
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
  private scores = (t: TicTacToeWinner, depth: number = 0) =>
    t === 'tie' ? 0 : t === this.getTurn() ? 10 - depth : -10 + depth;
  private player = (isMaxing: boolean) =>
    isMaxing ? this.getTurn() : this.getTurn(this.turns + 1);
}
