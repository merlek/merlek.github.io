import { IPoint } from '../../../../lib/canvas/point';

export type TicTacToeMark = 'X' | 'O';
const X = 'X';
const O = 'O';
export type TicTacToeWinner = TicTacToeMark | 'tie';
export class TicTacToeGameState {
  private board: TicTacToeMark[][] = [];
  protected turns = 0;
  public winner?: TicTacToeMark;
  constructor(
    public readonly cols: number = 3,
    public readonly rows: number = 3
  ) {
    for (let x = 0; x < this.cols; x++) {
      this.board[x] = [];
    }
  }
  public get({ x, y }: IPoint): TicTacToeMark | undefined {
    return this.board[x] ? this.board[x][y] : undefined;
  }
  protected set({ x, y }: IPoint, marker: TicTacToeMark): void {
    this.board[x][y] = marker;
  }
  protected setIfAble(marker: TicTacToeMark, p: IPoint): boolean {
    let set = false;
    if (!this.winner) {
      if (!this.get(p)) {
        this.set(p, marker);
        set = true;
      }
      this.checkWinner();
    }
    return set;
  }
  protected setNextTurn(p: IPoint): boolean {
    let set = false;
    if (p && this.setIfAble(this.getTurn(), p)) {
      this.nextTurn();
      set = true;
    }
    return set;
  }
  public takeTurn(p?: IPoint): void {
    this.setNextTurn(p);
  }
  protected nextTurn(): TicTacToeMark {
    return this.turns++ % 2 === 0 ? X : O;
  }
  protected getTurn(turn = this.turns): TicTacToeMark {
    return turn % 2 === 0 ? X : O;
  }
  public checkWinner(set = true): TicTacToeWinner {
    let winner;
    if (!(winner = this.checkColWins())) {
      if (!(winner = this.checkRowWins())) {
        if (!(winner = this.checkDiagonalWins())) {
          if (this.checkBoardFull()) {
            winner = 'tie';
          }
        }
      }
    }
    if (set) {
      this.winner = winner;
    }
    return winner;
  }
  private checkColWins(): TicTacToeMark | undefined {
    for (let x = 0; x < this.cols; x++) {
      let v = this.get({ x, y: 0 });
      for (let y = 1; y < this.rows; y++) {
        if (v !== this.get({ x, y })) {
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
      let v = this.get({ x: 0, y });
      for (let x = 1; x < this.rows; x++) {
        if (v !== this.get({ x, y })) {
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
    let v1 = this.get({ x: 0, y: 0 });
    let v2 = this.get({ x: 0, y: this.rows - 1 });
    for (let i = 1; i < this.cols; i++) {
      if (v1 !== this.get({ x: i, y: i })) {
        v1 = undefined;
      }
      if (v2 !== this.get({ x: i, y: this.rows - 1 - i })) {
        v2 = undefined;
      }
    }
    return v1 || v2;
  }
  private checkBoardFull(): boolean {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (!this.get({ x, y })) {
          return false;
        }
      }
    }
    return true;
  }
  public next = () => new TicTacToeGameState(this.cols, this.rows);
}
