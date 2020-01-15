export interface IPoint {
  x: number;
  y: number;
}

export class Point implements IPoint {
  constructor(public readonly x: number, public readonly y: number) {}
  public equals(other: Point): boolean {
    return other != null && this.x === other.x && this.y === other.y;
  }
  public squaredDistance(other: Point): number {
    return Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2);
  }
  public distance(other: Point): number {
    return Math.sqrt(this.squaredDistance(other));
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
