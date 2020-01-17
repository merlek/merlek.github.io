import { OnDestroy } from '@angular/core';
import { CanvasGridAnimator } from 'app/lib/canvas/canvas-grid-animator';
import { Button, Mouse, Text } from 'app/lib/canvas/Canvas-Tools';

export class PauseMenuAnimator extends CanvasGridAnimator implements OnDestroy {
  private buttons: Button[] = [];
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
        font: Text.getFont(this.y(1)),
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
        font: Text.getFont(this.y(1) * 0.8),
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
    buttons: Button[] = this.buttons
  ) {
    return this.eventListeners.push(
      Mouse.addClickEventListener(canvas, buttons),
      Mouse.addHoverEventListener(canvas, buttons)
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
  enableButtons(buttons: Button[] = this.buttons) {
    buttons.forEach(b => (b.enabled = true));
  }
  disableButtons(buttons: Button[] = this.buttons) {
    buttons.forEach(b => (b.enabled = false));
  }
  public draw = (ctx: CanvasRenderingContext2D = this.ctx) => {
    this.clear();

    this.buttons.forEach(Button.draw(ctx));
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
