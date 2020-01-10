import { Direction, Point, Apple, Directions } from './point';
import { Snake, rnd } from './snake';
export class SnakeGameState {
  constructor(
    public readonly isTwoPlayers = false,
    public readonly cols: number = 24,
    public readonly rows: number = 24,
    public readonly snakes: Snake[] = [],
    public readonly apple: Apple = new Point(20, 2)
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
    return new Snake(
      this.cols,
      this.rows,
      [startingMove],
      startingPoint,
      this.apple,
      [startingPoint]
    );
  }
  public isCrash(): boolean {
    return this.snakes.reduce(
      (acc, curr) => acc || curr.snake.length === 0,
      false
    );
  }
  private willEat(): boolean {
    return this.snakes.reduce((acc, curr) => acc || curr.willEat(), false);
  }
  private nextApple(): Point {
    return this.willEat() ? this.rndPos() : this.apple;
  }
  private nextSnakes(): Snake[] {
    return this.snakes.map((s, i, src) =>
      s.next(
        this.cols,
        this.rows,
        this.apple,
        src.length > 1 ? src[(i + 1) % src.length] : null
      )
    );
  }
  private rndPos(): Point {
    return new Point(rnd(0, this.cols - 1), rnd(0, this.rows - 1));
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
      this.nextApple()
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
