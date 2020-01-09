const rnd = (min: number, max: number) => Math.floor(Math.random() * max) + min;
const mod = x => y => ((y % x) + x) % x;

export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  equals(other: Point): boolean {
    return other != null && this.x === other.x && this.y === other.y;
  }
}
export class Direction {
  static readonly NORTH = new Point(0, -1);
  static readonly SOUTH = new Point(0, 1);
  static readonly EAST = new Point(1, 0);
  static readonly WEST = new Point(-1, 0);
  private constructor() {}
}

export class State {
  constructor(
    public readonly cols: number = 70,
    public readonly rows: number = 50,
    public readonly moves: Point[] = [Direction.EAST],
    public readonly snake: Point[] = [],
    public readonly apple: Point = new Point(16, 2)
  ) {}
  private willEat(): boolean {
    return this.nextHead().equals(this.apple);
  }
  private willCrash(): boolean {
    return this.snake.find(p => p && this.nextHead().equals(p)) != null;
  }
  private validMove(move: Point): boolean {
    return this.moves[0].x + move.x !== 0 || this.moves[0].y + move.y !== 0;
  }
  private nextMoves() {
    return this.moves.length > 1 ? this.moves.slice(1) : this.moves;
  }
  private nextApple(): Point {
    return this.willEat() ? this.rndPos() : this.apple;
  }
  private nextHead(): Point {
    return this.snake.length === 0
      ? new Point(2, 2)
      : new Point(
          mod(this.cols)(this.snake[0].x + this.moves[0].x),
          mod(this.rows)(this.snake[0].y + this.moves[0].y)
        );
  }
  private nextSnake(): Point[] {
    return this.willCrash()
      ? []
      : this.willEat()
      ? [this.nextHead()].concat(this.snake)
      : [this.nextHead()].concat(this.snake.slice(0, this.snake.length - 1));
  }
  private rndPos(): Point {
    return new Point(rnd(0, this.cols - 1), rnd(0, this.rows - 1));
  }
  private merge(other: any): State {
    return Object.assign(new State(), this, other);
  }
  public next(): State {
    return new State(
      this.cols,
      this.rows,
      this.nextMoves(),
      this.nextSnake(),
      this.nextApple()
    );
  }
  public enqueue(move: Point): State {
    return this.validMove(move)
      ? this.merge({ moves: this.moves.concat([move]) })
      : this;
  }
}
