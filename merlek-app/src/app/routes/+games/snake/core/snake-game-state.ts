import { Direction, Point, Apple, Directions } from './point';
import { Snake } from './snake';
import { rnd } from 'app/lib/helpers';
export class SnakeGameState {
  static readonly MAX_APPLES = 5;
  constructor(
    public readonly isTwoPlayers = false,
    public readonly cols: number = 24,
    public readonly rows: number = 24,
    public readonly snakes: Snake[] = [],
    public readonly apples: Apple[] = [new Point(20, 2), new Point(2, 20)]
  ) {
    if (this.snakes.length === 0) {
      this.snakes = [this.snakeFromState(Directions.EAST, new Point(2, 2))];
      if (this.isTwoPlayers) {
        this.snakes.push(
          this.snakeFromState(Directions.NORTH, new Point(20, 20))
        );
      }
    }
  }
  private snakeFromState(startingMove: Direction, startingPoint: Point): Snake {
    return new Snake(this.cols, this.rows, [startingMove], startingPoint, [
      startingPoint
    ]);
  }
  public isCrash(): boolean {
    return this.snakes.reduce((acc, curr) => acc || !curr.isAlive(), false);
  }
  private willEat(apple: Apple): boolean {
    return this.snakes.reduce((acc, curr) => acc || curr.willEat(apple), false);
  }
  private newApple(): Point {
    let nextApple: Point;
    do {
      nextApple = this.snakes.reduce((acc, cur) => {
        return cur.inSnake(acc) ? null : acc;
      }, this.rndPos());
    } while (!nextApple);
    return nextApple;
  }
  private nextApple(apple: Apple): Point {
    if (this.willEat(apple)) {
      return this.apples.length <= 1 || rnd(0)(2) === 0
        ? this.newApple()
        : null;
      // return this.newApple();
    } else {
      return apple;
    }
  }
  private nextApples(): Point[] {
    const apples = this.apples
      .map(apple => {
        return this.nextApple(apple);
      })
      .filter(Boolean);
    if (this.apples.length < SnakeGameState.MAX_APPLES && rnd(0)(100) === 0) {
      apples.push(this.newApple());
    }
    return apples;
  }
  private nextSnakes(): Snake[] {
    return this.snakes.map((s, i, src) =>
      s.next(
        this.cols,
        this.rows,
        this.apples,
        src.length > 1 ? src[(i + 1) % src.length] : null
      )
    );
  }
  private rndPos(): Point {
    return new Point(rnd(0)(this.cols), rnd(0)(this.rows));
  }
  private merge(other: any): SnakeGameState {
    return Object.assign(new SnakeGameState(), this, other);
  }
  public next(): SnakeGameState {
    return new SnakeGameState(
      this.isTwoPlayers,
      this.cols,
      this.rows,
      this.nextSnakes(),
      this.nextApples()
    );
  }
  public enqueue(snakeId: number, move: Direction): SnakeGameState {
    snakeId = snakeId % this.snakes.length;
    return this.merge({
      snakes: this.snakes.map((s, i) =>
        i === snakeId ? this.snakes[snakeId].enqueue(move) : s
      )
    });
  }
}
