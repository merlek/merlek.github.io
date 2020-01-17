export interface Point {
  x: number;
  y: number;
}
export class Point {
  private constructor() {}
  static create(x: number, y: number): Point {
    return { x: x, y: y };
  }
  static equals = (p1: Point) => (p2: Point) => {
    return p1 != null && p2 != null && p1.x === p2.x && p1.y === p2.y;
  };
  static squaredDistance(p1: Point, p2: Point): number {
    return Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);
  }
  static distance(p1: Point, p2: Point): number {
    return Math.sqrt(this.squaredDistance(p1, p2));
  }
}
