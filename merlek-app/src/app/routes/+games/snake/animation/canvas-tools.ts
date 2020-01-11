export interface RoundedRectRadius {
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
}
export interface CanvasButton {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fillStyle: string;
  strokeStyle?: string;
  hoverStyle?: string;
  text: string;
  fontSize: number;
  textStyle: string;
  alpha?: number;
  fade?: number;
  state?: string;
}
export class CanvasTools {
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
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (const key of Object.keys(defaultRadius)) {
        radius[key] = radius[key] || defaultRadius[key];
      }
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

  static drawButton = (
    ctx: CanvasRenderingContext2D,
    {
      x,
      y,
      width,
      height,
      radius,
      fillStyle,
      strokeStyle,
      hoverStyle,
      text,
      fontSize,
      textStyle,
      alpha,
      fade,
      state
    }: CanvasButton
  ) => {
    ctx.save();

    ctx.globalAlpha = alpha += fade;

    if (state === 'hover') {
      ctx.fillStyle = hoverStyle;
    } else {
      ctx.fillStyle = fillStyle;
    }
    ctx.fill();

    if (strokeStyle) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = strokeStyle;
      ctx.stroke();
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

    ctx.restore();

    CanvasTools.drawText(
      ctx,
      text,
      x + width / 2,
      y + height / 2,
      fontSize,
      textStyle
    );
  }

  static drawText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fillStyle: string,
    textAlign: CanvasTextAlign = 'center',
    textBaseline: CanvasTextBaseline = 'middle'
  ) => {
    ctx.save();

    ctx.fillStyle = fillStyle;
    ctx.font = CanvasTools.getFont(fontSize); // '24px sans-serif';
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);

    ctx.restore();
  }

  static getFont = fontSize => {
    // return fontSize + 'px \'Source Sans Pro\', Arial, sans-serif';
    return (
      fontSize +
      'px Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    );
  }
}
