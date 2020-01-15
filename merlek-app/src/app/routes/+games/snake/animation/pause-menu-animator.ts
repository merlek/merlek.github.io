import { CanvasAnimator } from '../../../../lib/canvas/canvas-animator';
import {
  CanvasTools,
  ICanvasButton
} from '../../../../lib/canvas/canvas-tools';
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
    pause: () => any,
    toggleTwoPlayers: () => any
  ) {
    super(canvas, grid);

    const width = canvas.width / 4;
    const height = canvas.height / 8;

    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 - height / 2;

    this.buttons.push(
      {
        x,
        y,
        width,
        height,
        radius: 5,
        fillStyle: '#005FA1',
        hoverStyle: '#00487b',
        text: 'Paused',
        font: CanvasTools.getFont(this.y(1)),
        textStyle: 'white',
        enabled: true,
        onClick: () => {
          pause();
        }
      },
      {
        x,
        y: y + height * 2,
        width,
        height,
        radius: 5,
        fillStyle: '#005fa1',
        hoverStyle: '#00487b',
        text: 'Two Players',
        font: CanvasTools.getFont(this.y(1) * 0.8),
        textStyle: 'rgba(255, 255, 255, 1)',
        enabled: true,
        onClick: () => {
          toggleTwoPlayers();
        }
      }
    );

    this.addEventListeners();
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

    // ctx.globalAlpha = 0.7;

    this.buttons.forEach(CanvasTools.drawButton(ctx));
    // CanvasTools.drawButton(ctx)(this.buttons[0]);
    // CanvasTools.drawButton(ctx)(this.buttons[1]);

    ctx.restore();
  };
  public show() {
    this.enableButtons();
    this.draw();
  }
  public hide() {
    this.clear();
    this.disableButtons();
    this.canvas.style.cursor = 'default';
  }
  ngOnDestroy(): void {
    this.removeEventListeners();
  }
}
