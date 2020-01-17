export class Text {
  private constructor() {}
  static draw = (
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
}
