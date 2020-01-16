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

function equals3(a: any, b: any, c: any) {
  return a === b && b === c && a !== undefined;
}

function checkWinner(board: TicTacToeMark[][]): TicTacToeWinner {
  let winner: TicTacToeMark;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === undefined) {
        openSpots++;
      }
    }
  }

  if (winner === undefined && openSpots === 0) {
    return 'tie';
  } else {
    return winner;
  }
}
export class TicTacToeAI extends TicTacToeGameState {
  static calls = 0;
  // static minimax(
  //   state: TicTacToeAI,
  //   depth: number = 0,
  //   isMaximizingPlayer = true
  // ): { score: number; move?: Point } {
  //   if (TicTacToeAI.calls > 255168) {
  //     throw Error('Should have solved it by now');
  //   }
  //   console.log(
  //     'minimax',
  //     TicTacToeAI.calls++,
  //     state.getTurn(),
  //     depth,
  //     isMaximizingPlayer
  //   );
  //   const result = state.checkWinner();
  //   if (result !== undefined) {
  //     return { score: scores[result] };
  //   }

  //   const moves = state.getAvailableMoves();
  //   let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
  //   let bestMove: Point;

  //   const t = state.nextTurn();

  //   moves.forEach(move => {
  //     state.set(move, t);
  //     const { score } = this.minimax(state, depth + 1, !isMaximizingPlayer);
  //     state.set(move, undefined);
  //     bestScore = isMaximizingPlayer
  //       ? Math.max(score, bestScore)
  //       : Math.min(score, bestScore);
  //     if (bestScore === score) {
  //       bestMove = move;
  //     }
  //   });

  //   state.removeTurn();

  //   return { score: bestScore, move: bestMove };
  // }
  constructor(cols: number = 3, rows: number = 3, private isAiTurn = false) {
    super(cols, rows);
    (window as any).TicTacToeAI = this;
  }

  static minimax(board, depth: number, isMaximizing: boolean) {
    if (TicTacToeAI.calls++ > 255168) {
      throw Error('Should have solved it by now');
    }
    const result = checkWinner(board);
    if (result !== undefined) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] === undefined) {
            board[i][j] = ai;
            const score = TicTacToeAI.minimax(board, depth + 1, false);
            board[i][j] = undefined;
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
          if (board[i][j] === undefined) {
            board[i][j] = human;
            const score = TicTacToeAI.minimax(board, depth + 1, true);
            board[i][j] = undefined;
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
          const score = TicTacToeAI.minimax(this.board, 0, false);
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
