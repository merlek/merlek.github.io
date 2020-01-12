import { Apple, Direction, Point, Directions } from './point';
import { mod } from 'app/lib/helpers';
export class Snake {
  constructor(
    public readonly cols: number,
    public readonly rows: number,
    public readonly moves: Direction[],
    public readonly start: Point,
    public readonly snake: Point[] = []
  ) {}
  public willEat(apple: Apple): boolean {
    return this.nextHead().equals(apple);
  }
  public inSnake(point: Point) {
    return this.snake.some(p => p.equals(point));
  }
  private willCrash(other?: Snake): boolean {
    const nextHead = this.nextHead();
    return (
      this.inSnake(nextHead) ||
      (other &&
        (other.inSnake(nextHead) ||
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
  private nextSnake(apples: Apple[], other?: Snake): Point[] {
    if (this.willCrash(other)) {
      return [];
    } else {
      if (apples.some(apple => this.willEat(apple))) {
        return [this.nextHead()].concat(this.snake);
      } else {
        return [this.nextHead()].concat(
          this.snake.slice(0, this.snake.length - 1)
        );
      }
    }
  }
  private merge(other: any): Snake {
    return Object.assign(
      new Snake(this.cols, this.rows, this.moves, this.start, this.snake),
      other
    );
  }
  public next(
    cols: number,
    rows: number,
    apples: Apple[],
    other?: Snake
  ): Snake {
    return new Snake(
      cols,
      rows,
      this.nextMoves(),
      this.start,
      this.nextSnake(apples, other)
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
