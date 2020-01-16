import { rnd } from 'app/lib/helpers';
import { Point, IPoint } from '../../../../lib/canvas/point';
import { TicTacToeAI } from './tic-tac-toe-game-ai';

export type TicTacToeMark = 'X' | 'O';
const X = 'X';
const O = 'O';
export type TicTacToeGameOver = TicTacToeMark | 'Tie';
export class TicTacToeGameState {
  private board: TicTacToeMark[][] = [];
  private turns = 0;
  public winner?: TicTacToeMark;
  private isAiTurn = false;
  constructor(
    public readonly cols: number = 3,
    public readonly rows: number = 3,
    private readonly ai = new TicTacToeAI()
  ) {
    this.takeAiTurn();
  }
  public get(x: number, y: number): TicTacToeMark | undefined {
    return this.board[x] ? this.board[x][y] : undefined;
  }
  private set(marker: TicTacToeMark, x: number, y: number): boolean {
    let set = false;
    if (!this.winner) {
      if (!this.board[x]) {
        this.board[x] = [];
      }
      if (!this.board[x][y]) {
        this.board[x][y] = marker;
        set = true;
      }
      this.checkGameOver();
    }
    return set;
  }
  private getTurn(): TicTacToeMark {
    return this.turns % 2 === 0 ? X : O;
  }
  private setNextTurn({ x, y }: IPoint): boolean {
    if (this.set(this.getTurn(), x, y)) {
      this.turns++;
      return true;
    }
    return false;
  }
  public takeTurn(p: IPoint) {
    if (!this.isAiTurn) {
      console.log('takeTurn', this.isAiTurn);
      if (this.setNextTurn(p)) {
        this.isAiTurn = true;
      }
    }
  }
  public takeAiTurn() {
    if (this.isAiTurn && !this.checkGameOver()) {
      console.log('takeAiTurn', this.isAiTurn);
      while (!this.setNextTurn(this.ai.getNextMove(this))) {}
      this.isAiTurn = false;
    }
  }

  private checkGameOver(): TicTacToeGameOver {
    let winner;
    if (!(winner = this.checkColWins())) {
      if (!(winner = this.checkRowWins())) {
        if (!(winner = this.checkDiagonalWins())) {
          if (this.checkBoardFull()) {
            winner = 'Tie';
          }
        }
      }
    }
    return (this.winner = winner);
  }
  private checkColWins(): TicTacToeMark | undefined {
    for (let x = 0; x < this.cols; x++) {
      let v = this.get(x, 0);
      for (let y = 1; y < this.rows; y++) {
        if (v !== this.get(x, y)) {
          v = undefined;
        }
      }
      if (v) {
        return v;
      }
    }
    return undefined;
  }
  private checkRowWins(): TicTacToeMark | undefined {
    for (let y = 0; y < this.cols; y++) {
      let v = this.get(0, y);
      for (let x = 1; x < this.rows; x++) {
        if (v !== this.get(x, y)) {
          v = undefined;
        }
      }
      if (v) {
        return v;
      }
    }
    return undefined;
  }
  private checkDiagonalWins(): TicTacToeMark | undefined {
    let v1 = this.get(0, 0);
    let v2 = this.get(0, this.rows - 1);
    for (let i = 1; i < this.cols; i++) {
      if (v1 !== this.get(i, i)) {
        v1 = undefined;
      }
      if (v2 !== this.get(i, this.rows - 1 - i)) {
        v2 = undefined;
      }
    }
    return v1 || v2;
  }
  private checkBoardFull(): boolean {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (!this.get(x, y)) {
          return false;
        }
      }
    }
    return true;
  }
  private rndPos(): Point {
    return new Point(rnd(0)(this.cols), rnd(0)(this.rows));
  }
  public next = () => new TicTacToeGameState(this.cols, this.rows);
}
