import { ICanvasButton, CanvasTools } from './canvas-tools';
import { SnakeGameState } from '../core/snake-game-state';
import { CanvasAnimator } from './canvas-animator';

export class PauseMenuAnimator extends CanvasAnimator {
  private buttons: ICanvasButton[] = [];
  constructor(
    canvas: HTMLCanvasElement,
    state: SnakeGameState,
    public pause: () => any
  ) {
    super(canvas, state);

    this.initButtons();

    CanvasTools.addButtonClickEventListeners(canvas, this.buttons);
    CanvasTools.addButtonHoverEventListeners(canvas, this.buttons);
  }

  private initButtons(canvas: HTMLCanvasElement = this.canvas) {
    const width = canvas.width / 4;
    const height = canvas.height / 8;

    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 - height / 2;

    this.buttons.push({
      x,
      y,
      width,
      height,
      radius: 5,
      fillStyle: 'rgba(128, 128, 128, 1)',
      hoverStyle: 'rgba(179, 179, 179, 1)',
      text: 'Paused',
      fontSize: this.y(1),
      textStyle: 'white',
      onClick: () => {
        this.pause();
      }
    });

    return this.buttons;
  }
  public draw(ctx: CanvasRenderingContext2D = this.ctx) {
    ctx.save();

    ctx.globalAlpha = 0.7;

    this.buttons.forEach(CanvasTools.drawButton(ctx));

    ctx.restore();
  }
}
