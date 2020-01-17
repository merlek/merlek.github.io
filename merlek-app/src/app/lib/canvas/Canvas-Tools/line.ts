import { Point } from './point';

export class Line {
  static draw = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
  };
}
