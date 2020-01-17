import {
  ClickEventObject,
  HoverEventObject,
  MouseEventListener
} from './mouse';
import { RoundedRect } from './rounded-rect';
import { Text } from './text';
export interface Button extends ClickEventObject, HoverEventObject {
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
export class Button {
  private constructor() {}
  static draw = (ctx: CanvasRenderingContext2D) => ({
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
  }: Button) => {
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

    RoundedRect.draw(
      ctx,
      x,
      y,
      width,
      height,
      radius,
      true,
      strokeStyle != null
    );

    Text.draw(
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
}
