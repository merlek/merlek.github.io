import { Point } from './point';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Rect {
  private constructor() {}
  static isIntersect = (pos: Point, button: Rect) =>
    pos.x > button.x &&
    pos.x < button.x + button.width &&
    pos.y < button.y + button.height &&
    pos.y > button.y;
}
