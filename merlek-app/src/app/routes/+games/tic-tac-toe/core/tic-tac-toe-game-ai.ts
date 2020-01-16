import { rnd } from 'app/lib/helpers';
import { IPoint, Point } from '../../../../lib/canvas/point';
import { TicTacToeGameState, TicTacToeWinner } from './tic-tac-toe-game-state';

const scores = {
  X: -10,
  O: 10,
  tie: 0
} as {
  [key in TicTacToeWinner]: number;
};
const ai = 'O';
const human = 'X';

export class TicTacToeAI extends TicTacToeGameState {
  constructor(cols: number = 3, rows: number = 3, private isAiTurn = false) {
    super(cols, rows);
    (window as any).TicTacToeAI = this;
  }

  static minimax(
    state: TicTacToeAI,
    depth: number = 0,
    isMaximizing: boolean = true
  ): { score: number; move?: Point } {
    const result = state.checkWinner(false);
    if (result !== undefined) {
      return { score: scores[result] };
    }

    const moves = state.getAvailableMoves();

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove;

    moves.forEach(move => {
      state.set(move, isMaximizing ? ai : human);
      const { score } = TicTacToeAI.minimax(state, depth + 1, !isMaximizing);
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
  public takeTurn(p?: IPoint): void {
    if (this.isAiTurn && !this.checkWinner()) {
      // setTimeout(() => {
      while (!this.setNextTurn(this.getNextMove())) {}
      this.bestMove();
      this.checkWinner();
      this.isAiTurn = false;
      // }, 1000);
    } else {
      this.isAiTurn = this.setNextTurn(p);
    }
  }
  public getNextMove(): Point {
    return this.bestMove();
  }
  private rndPos(): Point {
    return new Point(rnd(0)(this.cols), rnd(0)(this.rows));
  }
  protected removeTurn(): undefined {
    this.turns--;
    return undefined;
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
    return TicTacToeAI.minimax(this).move;
  }
}
