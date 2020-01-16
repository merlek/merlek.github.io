import { rnd } from 'app/lib/helpers';
import { Point, IPoint } from '../../../../lib/canvas/point';
import {
  TicTacToeGameState,
  TicTacToeWinner,
  TicTacToeMark
} from './tic-tac-toe-game-state';

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
  // static minimax(
  //   state: TicTacToeAI,
  //   depth: number = 0,
  //   isMaximizingPlayer = true
  // ): number {
  //   const result = state.checkWinner();
  //   if (result !== undefined) {
  //     return scores[result];
  //   }

  //   const moves = state.getAvailableMoves();
  //   let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
  //   let bestMove: Point;

  //   const t = state.nextTurn();

  //   moves.forEach(move => {
  //     state.set(move, t);
  //     const score = this.minimax(state, depth + 1, !isMaximizingPlayer);
  //     state.set(move, undefined);
  //     bestScore = isMaximizingPlayer
  //       ? Math.max(score, bestScore)
  //       : Math.min(score, bestScore);
  //     if (bestScore === score) {
  //       bestMove = move;
  //     }
  //   });

  //   state.removeTurn();

  //   return bestScore;
  // }
  constructor(cols: number = 3, rows: number = 3, private isAiTurn = false) {
    super(cols, rows);
    (window as any).TicTacToeAI = this;
  }

  static minimax(state: TicTacToeAI, depth: number, isMaximizing: boolean) {
    const result = state.checkWinner(false);
    if (result !== undefined) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (state.board[i][j] === undefined) {
            state.board[i][j] = ai;
            const score = TicTacToeAI.minimax(state, depth + 1, false);
            state.board[i][j] = undefined;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (state.board[i][j] === undefined) {
            state.board[i][j] = human;
            const score = TicTacToeAI.minimax(state, depth + 1, true);
            state.board[i][j] = undefined;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  public takeTurn(p?: IPoint): void {
    if (this.isAiTurn && !this.checkWinner()) {
      // setTimeout(() => {
      // while (!this.setNextTurn(this.getNextMove())) {}
      this.bestMove();
      this.checkWinner();
      this.isAiTurn = false;
      // }, 1000);
    } else {
      this.isAiTurn = this.setNextTurn(p);
    }
  }
  // public getNextMove(): Point {
  //   return this.bestMove();
  // }
  private rndPos(): Point {
    return new Point(rnd(0)(this.cols), rnd(0)(this.rows));
  }
  protected removeTurn(): undefined {
    this.turns--;
    return undefined;
  }
  // private bestMove(): Point {
  //   // let bestScore = -Infinity;
  //   // let bestMove;
  //   // const t = this.nextTurn();
  //   // this.getAvailableMoves().forEach(move => {
  //   //   this.set(move, t);
  //   //   const { score } = TicTacToeAI.minimax(this, 0, false);
  //   //   this.set(move, undefined);
  //   //   if (score > bestScore) {
  //   //     bestScore = score;
  //   //     bestMove = move;
  //   //   }
  //   // });
  //   // this.removeTurn();
  //   // return bestMove;
  //   return TicTacToeAI.minimax(this).move;
  // }
  private getAvailableMoves(): Point[] {
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

  private bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (this.board[i][j] === undefined) {
          this.board[i][j] = ai;
          const score = TicTacToeAI.minimax(this, 0, false);
          this.board[i][j] = undefined;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    console.log('bestScore', bestScore, 'bestMove', move);
    this.board[move.i][move.j] = ai;
    this.turns++; // currentPlayer = human;
  }
}
