import { Point, IPoint } from './point';

export type MouseEventListener = (event: MouseEvent) => any;

export interface RoundedRectRadius {
  tl: number;
  tr: number;
  br: number;
  bl: number;
  // [key: string]: number | undefined;
}
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface ClickEventObject extends Rect {
  enabled: boolean;
  onClick: MouseEventListener;
}
export interface HoverEventObject extends Rect {
  enabled: boolean;
  state?: 'hover';
  onMouseEnter?: MouseEventListener;
  onMouseLeave?: MouseEventListener;
}
export interface ICanvasButton extends ClickEventObject, HoverEventObject {
  radius: number;
  fillStyle: string;
  strokeStyle?: string;
  borderWidth?: number;
  hoverStyle?: string;
  text: string;
  font: string;
  textStyle: string | (() => string);
  state?: 'hover' | undefined;
  enabled: boolean;
  onClick: MouseEventListener;
  onMouseEnter?: MouseEventListener;
  onMouseLeave?: MouseEventListener;
}

export class CanvasTools {
  static readonly FONT_BASE = 20;
  static readonly FONT_SIZE = 14;
  static drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | RoundedRectRadius = 10,
    fill = true,
    stroke = false
  ) {
    if (typeof radius === 'number') {
      radius = {
        tl: radius,
        tr: radius,
        br: radius,
        bl: radius
      };
    }

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();

    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }
  static drawButton = (ctx: CanvasRenderingContext2D) => ({
    x,
    y,
    width,
    height,
    radius,
    fillStyle,
    strokeStyle = 'rgba(255,255,255,0)',
    borderWidth = Math.min(4, (width / 36) * 4),
    hoverStyle,
    text,
    font,
    textStyle,
    state
  }: ICanvasButton) => {
    ctx.save();

    if (state === 'hover' && hoverStyle) {
      ctx.fillStyle = hoverStyle;
    } else if (fillStyle) {
      ctx.fillStyle = fillStyle;
    }

    ctx.lineWidth = borderWidth;

    if (state === 'hover' && hoverStyle) {
      ctx.strokeStyle = hoverStyle;
    } else if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
    }

    CanvasTools.drawRoundedRect(
      ctx,
      x,
      y,
      width,
      height,
      radius,
      true,
      strokeStyle != null
    );

    CanvasTools.drawText(
      ctx,
      text,
      x + width / 2,
      y + height / 2,
      width * 0.9,
      font,
      typeof textStyle === 'string' ? textStyle : textStyle()
    );

    ctx.restore();
  };
  static drawText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number | undefined,
    font: string,
    fillStyle: string,
    textAlign: CanvasTextAlign = 'center',
    textBaseline: CanvasTextBaseline = 'middle'
  ) => {
    ctx.save();

    ctx.fillStyle = fillStyle;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y, maxWidth);

    ctx.restore();
  };
  static getFont = (fontSize: number) => {
    return (
      fontSize +
      'px Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    );
  };
  static drawLine = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
  };
  static addButtonClickEventListener = (
    canvas: HTMLCanvasElement,
    buttons: ClickEventObject[]
  ) => {
    const getMousePos = CanvasTools.getMousePos(canvas);

    const handler = (e: MouseEvent) => {
      const pos = getMousePos(e);
      buttons.forEach(button => {
        if (button.enabled && CanvasTools.isIntersect(pos, button)) {
          // click event
          button.onClick(e);
        }
      });
    };

    canvas.addEventListener('click', handler);

    return { type: 'click', function: handler } as {
      type: string;
      function: MouseEventListener;
    };
  };
  static addButtonHoverEventListener = (
    canvas: HTMLCanvasElement,
    buttons: HoverEventObject[]
  ) => {
    const getMousePos = CanvasTools.getMousePos(canvas);

    const handler = (e: MouseEvent) => {
      const pos = getMousePos(e);
      let intersect = false;
      buttons.forEach(button => {
        if (button.enabled && CanvasTools.isIntersect(pos, button)) {
          // hover event
          if (button.state !== 'hover') {
            button.state = 'hover';
            if (button.onMouseEnter) {
              button.onMouseEnter(e);
            }
          }
          intersect = true;
        } else if (button.state === 'hover') {
          button.state = undefined;
          if (button.onMouseLeave) {
            button.onMouseLeave(e);
          }
        }
      });
      canvas.style.cursor = intersect ? 'pointer' : 'default';
    };

    canvas.addEventListener('mousemove', handler);

    return { type: 'mousemove', function: handler } as {
      type: string;
      function: MouseEventListener;
    };
  };
  static getMousePos = (canvas: HTMLCanvasElement) => (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
    };
  };
  static isIntersect = (pos: IPoint, button: Rect) =>
    pos.x > button.x &&
    pos.x < button.x + button.width &&
    pos.y < button.y + button.height &&
    pos.y > button.y;
}
