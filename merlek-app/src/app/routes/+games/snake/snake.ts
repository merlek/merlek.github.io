import { Apple, Direction, Point, Directions } from './point';

export const rnd = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;
const mod = x => y => ((y % x) + x) % x;

export class Snake {
  constructor(
    public readonly cols: number,
    public readonly rows: number,
    public readonly moves: Direction[],
    public readonly start: Point,
    public readonly apple: Apple,
    public readonly snake: Point[] = []
  ) {}
  willEat(): boolean {
    return this.nextHead().equals(this.apple);
  }
  private willCrash(other?: Snake): boolean {
    return (
      this.snake.some(p => p && this.nextHead().equals(p)) ||
      (other &&
        (other.snake.some(p => p && this.nextHead().equals(p)) ||
          (this.snake[0] && this.snake[0].equals(other.snake[0]))))
    );
  }
  private validMove(move: Direction): boolean {
    return this.moves[0].x + move.x !== 0 || this.moves[0].y + move.y !== 0;
  }
  private nextMoves(): Direction[] {
    return this.moves.length > 1 ? this.moves.slice(1) : this.moves;
  }
  private nextHead(): Point {
    return this.snake.length === 0
      ? this.start
      : new Point(
          mod(this.cols)(this.snake[0].x + this.moves[0].x),
          mod(this.rows)(this.snake[0].y + this.moves[0].y)
        );
  }
  private nextSnake(other?: Snake): Point[] {
    return this.willCrash(other)
      ? []
      : this.willEat()
      ? [this.nextHead()].concat(this.snake)
      : [this.nextHead()].concat(this.snake.slice(0, this.snake.length - 1));
  }
  private merge(other: any): Snake {
    return Object.assign(
      new Snake(
        this.cols,
        this.rows,
        this.moves,
        this.start,
        this.apple,
        this.snake
      ),
      other
    );
  }
  public next(cols: number, rows: number, apple: Apple, other?: Snake): Snake {
    return new Snake(
      cols,
      rows,
      this.nextMoves(),
      this.start,
      apple,
      this.nextSnake(other)
    );
  }
  public enqueue(move: Direction): Snake {
    return this.validMove(move)
      ? this.merge({ moves: this.moves.concat([move]) })
      : this;
  }
  public direction(): number {
    const move = this.moves[0];
    if (move.equals(Directions.NORTH)) {
      return 270;
    } else if (move.equals(Directions.SOUTH)) {
      return 90;
    } else if (move.equals(Directions.EAST)) {
      return 0;
    } else if (move.equals(Directions.WEST)) {
      return 180;
    }
    return null;
  }
  public segments(): Point[][] {
    return this.snake.reduce((acc, cur) => {
      if (acc.length === 0) {
        acc.push([cur]);
      } else {
        const last = acc[acc.length - 1];
        if (cur.distance(last[last.length - 1]) === 1) {
          last.push(cur);
        } else {
          acc.push([cur]);
        }
      }
      return acc;
    }, []);
  }
  public isAlive(): boolean {
    return this.snake.length > 0;
  }
}
