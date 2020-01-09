import { State, Direction } from './snake';

export class SnakeAnimator {
  public fps = 30;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private animationFrameId: number;
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement,
    private state: State = new State()
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d');
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameCtx = gameCanvas.getContext('2d');
  }
  public start(): void {
    this.draw();
    this.animationFrameId = window.requestAnimationFrame(this.update(0));
  }
  private update = (t1: DOMHighResTimeStamp) => (t2: DOMHighResTimeStamp) => {
    if (t2 - t1 > 1000 / this.fps) {
      this.state = this.state.next();
      this.draw();
      this.animationFrameId = window.requestAnimationFrame(this.update(t2));
    } else {
      this.animationFrameId = window.requestAnimationFrame(this.update(t1));
    }
  }
  private draw(): void {
    // clear
    this.gameCtx.fillStyle = '#232323';
    this.gameCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // draw snake
    this.gameCtx.fillStyle = 'rgb(0,200,50)';
    this.state.snake.forEach(p =>
      this.gameCtx.fillRect(this.x(p.x), this.y(p.y), this.x(1), this.y(1))
    );

    // draw apples
    this.gameCtx.fillStyle = 'rgb(255,50,0)';
    this.gameCtx.fillRect(
      this.x(this.state.apple.x),
      this.y(this.state.apple.y),
      this.x(1),
      this.y(1)
    );

    // add crash
    if (this.state.snake.length === 0) {
      this.gameCtx.fillStyle = 'rgb(255,0,0)';
      this.gameCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }
  public destroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  public keyEvent(key: string): void {
    console.log('keyEvent', key);
    switch (key) {
      case 'w':
      case 'h':
      case 'ArrowUp':
        this.state = this.state.enqueue(Direction.NORTH);
        break;
      case 'a':
      case 'j':
      case 'ArrowLeft':
        this.state = this.state.enqueue(Direction.WEST);
        break;
      case 's':
      case 'k':
      case 'ArrowDown':
        this.state = this.state.enqueue(Direction.SOUTH);
        break;
      case 'd':
      case 'l':
      case 'ArrowRight':
        this.state = this.state.enqueue(Direction.EAST);
        break;
    }
  }
  private x(x: number) {
    return Math.round((x * this.canvasWidth) / this.state.cols);
  }
  private y(y: number) {
    return Math.round((y * this.canvasHeight) / this.state.rows);
  }
}
