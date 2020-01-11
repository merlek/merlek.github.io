import { CanvasAnimator } from './canvas-animator';
import { CanvasTools, ICanvasButton } from './canvas-tools';
import { OnDestroy } from '@angular/core';

export class PauseMenuAnimator extends CanvasAnimator implements OnDestroy {
  private buttons: ICanvasButton[] = [];
  private eventListeners: {
    type: string; // <K extends keyof HTMLElementEventMap>
    function: (e: MouseEvent) => void;
  }[] = [];
  constructor(
    canvas: HTMLCanvasElement,
    grid: { cols: number; rows: number },
    public pause: () => any
  ) {
    super(canvas, grid);
    this.initButtons();
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
      enabled: true,
      onClick: () => {
        this.pause();
      }
    });

    this.addEventListeners();

    return this.buttons;
  }
  addEventListeners(
    canvas: HTMLCanvasElement = this.canvas,
    buttons: ICanvasButton[] = this.buttons
  ) {
    return this.eventListeners.push(
      CanvasTools.addButtonClickEventListener(canvas, buttons),
      CanvasTools.addButtonHoverEventListener(canvas, buttons)
    );
  }
  removeEventListeners(
    canvas: HTMLCanvasElement = this.canvas,
    eventListeners: {
      type: string;
      function: (e: MouseEvent) => void;
    }[] = this.eventListeners
  ) {
    eventListeners.forEach(l => {
      canvas.removeEventListener(l.type, l.function);
    });
  }
  enableButtons(buttons: ICanvasButton[] = this.buttons) {
    buttons.forEach(b => (b.enabled = true));
  }
  disableButtons(buttons: ICanvasButton[] = this.buttons) {
    buttons.forEach(b => (b.enabled = false));
  }
  public draw = (ctx: CanvasRenderingContext2D = this.ctx) => {
    this.clear();

    ctx.save();

    ctx.globalAlpha = 0.7;

    this.buttons.forEach(CanvasTools.drawButton(ctx));

    ctx.restore();
  }
  public show() {
    this.enableButtons();
    this.draw();
  }
  public hide() {
    this.clear();
    this.disableButtons();
  }
  ngOnDestroy(): void {
    this.removeEventListeners();
  }
}
