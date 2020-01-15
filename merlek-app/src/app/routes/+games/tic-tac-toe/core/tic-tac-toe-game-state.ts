import { rnd } from 'app/lib/helpers';
import { Point } from '../../../../lib/canvas/point';

export type TicTacToeMark = 'X' | 'O';
const X = 'X';
const O = 'O';

export class TicTacToeGameState {
  private board: TicTacToeMark[][] = [];
  constructor(
    public readonly cols: number = 3,
    public readonly rows: number = 3
  ) {}
  public get(x: number, y: number): TicTacToeMark | undefined {
    return this.board[x] ? this.board[x][y] : undefined;
  }
  public set(marker: TicTacToeMark, x: number, y: number): void {
    if (!this.board[x]) {
      this.board[x] = [];
    }
    this.board[x][y] = marker;
  }
  private rndPos(): Point {
    return new Point(rnd(0)(this.cols), rnd(0)(this.rows));
  }
  // public next(): TicTacToeGameState {
  //   return new TicTacToeGameState(this.cols, this.rows);
  // }
  // public enqueue(snakeId: number, move: Direction): SnakeGameState {
  //   snakeId = snakeId % this.snakes.length;
  //   return this.merge({
  //     snakes: this.snakes.map((s, i) =>
  //       i === snakeId ? this.snakes[snakeId].enqueue(move) : s
  //     )
  //   });
  // }
}
