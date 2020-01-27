import { Point } from 'canvas-tools';
import { mod } from 'utility-functions';

export type Apple = Point;
export type Direction = Point;
export class Directions {
  static readonly NORTH: Direction = Point.create(0, -1);
  static readonly SOUTH: Direction = Point.create(0, 1);
  static readonly EAST: Direction = Point.create(1, 0);
  static readonly WEST: Direction = Point.create(-1, 0);
  private constructor() {}
}
export class Snake {
  constructor(
    public readonly cols: number,
    public readonly rows: number,
    public readonly moves: Direction[],
    public readonly start: Point,
    public readonly snake: Point[] = []
  ) {}
  public willEat(apple: Apple): boolean {
    return Point.equals(this.nextHead())(apple);
  }
  public inSnake(point: Point) {
    return this.snake.some(Point.equals(point));
  }
  private willCrash(other?: Snake): boolean {
    const nextHead = this.nextHead();
    return (
      this.inSnake(nextHead) ||
      (other &&
        (other.inSnake(nextHead) ||
          Point.equals(this.snake[0])(other.snake[0])))
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
      : Point.create(
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
    if (Point.equals(move)(Directions.NORTH)) {
      return 270;
    } else if (Point.equals(move)(Directions.SOUTH)) {
      return 90;
    } else if (Point.equals(move)(Directions.EAST)) {
      return 0;
    } else if (Point.equals(move)(Directions.WEST)) {
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
        if (Point.distance(cur, last[last.length - 1]) === 1) {
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
