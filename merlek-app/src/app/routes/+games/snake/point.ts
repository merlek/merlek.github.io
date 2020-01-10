export class Point {
  constructor(public readonly x: number, public readonly y: number) {}
  equals(other: Point): boolean {
    return other != null && this.x === other.x && this.y === other.y;
  }
}
export type Direction = Point;
export class Directions {
  static readonly NORTH: Direction = new Point(0, -1);
  static readonly SOUTH: Direction = new Point(0, 1);
  static readonly EAST: Direction = new Point(1, 0);
  static readonly WEST: Direction = new Point(-1, 0);
  private constructor() {}
}
export type Apple = Point;
