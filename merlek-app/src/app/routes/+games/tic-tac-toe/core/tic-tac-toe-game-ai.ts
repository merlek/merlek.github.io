import { IPoint, Point } from '../../../../lib/canvas/point';
import { TicTacToeGameState, TicTacToeWinner } from './tic-tac-toe-game-state';
import { rnd } from 'app/lib/helpers';

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export class TicTacToeAI extends TicTacToeGameState {
  constructor(
    cols: number = 3,
    rows: number = 3,
    public aiPlayer: 0 | 1 = rnd(0)(2) as 0 | 1
  ) {
    super(cols, rows);
  }
  public takeTurn(p?: IPoint): void {
    if (this.isAiTurn() && !this.checkWinner()) {
      // setTimeout(() => {
      while (!this.setNextTurn(this.bestMove())) {}
      // }, 1000);
      this.checkWinner();
    } else {
      this.setNextTurn(p);
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
    alpha: number = -Infinity,
    beta: number = Infinity,
    isMaximizing: boolean = true
  ): { score: number; move?: Point } {
    const result = state.checkWinner(false);
    if (result !== undefined) {
      return { score: this.scores(result, depth) };
    }

    const moves = shuffle(state.getAvailableMoves());

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove: Point;
    const compare = (a: any, b: any) => (isMaximizing ? a > b : a < b);

    for (const move of moves) {
      state.set(move, this.player(isMaximizing));
      const { score } = this.minimax(
        state,
        depth + 1,
        alpha,
        beta,
        !isMaximizing
      );
      state.set(move, undefined);

      if (compare(score, bestScore)) {
        bestScore = score;
        bestMove = move;
      }

      if (isMaximizing) {
        alpha = Math.max(alpha, score);
      } else {
        beta = Math.min(beta, score);
      }

      if (beta <= alpha) {
        break;
      }
    }

    return { score: bestScore, move: bestMove };
  }
  private scores = (t: TicTacToeWinner, depth: number = 0) =>
    t === 'tie' ? 0 : t === this.getTurn() ? 10 - depth : -10 + depth;
  private player = (isMaxing: boolean) =>
    isMaxing ? this.getTurn() : this.getTurn(this.turns + 1);
  public isAiTurn = () => this.turns % 2 === this.aiPlayer;
}
