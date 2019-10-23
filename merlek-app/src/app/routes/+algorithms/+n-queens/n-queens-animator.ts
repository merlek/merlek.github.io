import { NQueensAnimation } from './n-queens-animation-builder';
import queenImageBase64 from './queen-image-base64';

class BoardAnimator {
  private static queenImage: HTMLImageElement = new Image();
  private static initialized = false;

  private readonly x: number;
  private readonly y: number;
  private readonly squareSide: number;
  private readonly boardSide: number;

  private static initialize() {
    BoardAnimator.queenImage = new Image();
    BoardAnimator.queenImage.src = queenImageBase64;
    BoardAnimator.initialized = true;
  }
  constructor(
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
    private readonly n: number
  ) {
    this.squareSide = Math.min(this.canvasWidth, this.canvasHeight) / this.n;
    this.boardSide = this.squareSide * this.n;

    this.x = canvasWidth / 2 - this.boardSide / 2;
    this.y = 0;

    if (!BoardAnimator.initialized) {
      BoardAnimator.initialize();
    }
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    // Draw Board
    ctx.save();

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (i % 2 === j % 2) {
          ctx.fillStyle = '#FFCD9E';
        } else {
          ctx.fillStyle = '#D18B47';
        }
        ctx.fillRect(
          this.x + this.squareSide * i,
          this.y + this.squareSide * j,
          this.squareSide,
          this.squareSide
        );
      }
    }

    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.boardSide, this.boardSide);

    ctx.restore();
  }

  drawQueens(
    ctx: CanvasRenderingContext2D,
    queens: number[],
    solution: boolean
  ) {
    ctx.save();

    if (solution) {
      ctx.fillStyle = 'rgb(255, 255, 102, 0.9)';
    }

    queens.forEach((x, y) => {
      if (solution) {
        this.drawQueenCircle(ctx, x, y);
      }
      this.drawQueenImage(ctx, x, y);
    });

    ctx.restore();
  }
  private drawQueenImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath();

    const w = this.squareSide * 0.9;
    const i = this.x + (this.squareSide - w) / 2 + x * this.squareSide;
    const j = this.y + (this.squareSide - w) / 2 + y * this.squareSide;

    ctx.drawImage(BoardAnimator.queenImage, i, j, w, w);
  }

  private drawQueenCircle(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath();

    const i = this.x + this.squareSide / 2 + x * this.squareSide;
    const j = this.y + this.squareSide / 2 + y * this.squareSide;
    const r = this.squareSide / 2;

    // Draws a ball
    ctx.arc(i, j, r, 0, Math.PI * 2, true);
    ctx.closePath();

    // Colors and fills the ball
    ctx.fill();
    // ctx.stroke();
  }
}

export class NQueensAnimator {
  public fps = 30;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private nQueensAnimation: NQueensAnimation;
  private boardAnimator: BoardAnimator;
  private frameNumber = 0;
  private solutionCount = 0;
  private lastFrameSolution = false;
  private timeout: number;

  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d');
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameCtx = gameCanvas.getContext('2d');
  }

  public startAnimation(nQueensAnimation: NQueensAnimation) {
    this.nQueensAnimation = nQueensAnimation;
    this.reset();
  }

  private setup() {
    // Setup Board
    const boardWidth = this.canvasWidth;
    const boardHeight = this.canvasHeight;
    this.boardAnimator = new BoardAnimator(
      boardWidth,
      boardHeight,
      this.nQueensAnimation.numberOfQueens
    );

    this.boardAnimator.drawBoard(this.backgroundCtx);
  }

  /**
   * Draw step of the animation
   */
  private draw() {
    this.gameCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Step
    const frame = this.stepFrame();

    // Draw
    this.boardAnimator.drawQueens(this.gameCtx, frame.queens, frame.solution);

    if (this.frameNumber < this.nQueensAnimation.animationFrames.length) {
      this.timeout = window.setTimeout(() => this.draw(), 1000 / this.fps);
      // TODO change to requestAnimationFrame
      // https://developer.mozilla.org/en-US/docs/Games/Techniques/Efficient_animation_for_web_games
    }
  }

  private stepFrame() {
    const frame = this.nQueensAnimation.animationFrames[this.frameNumber++];
    if (frame.solution) {
      if (!this.lastFrameSolution) {
        this.solutionCount++;
      }
      this.lastFrameSolution = true;
    } else {
      this.lastFrameSolution = false;
    }
    return frame;
  }

  public getProgress(): number {
    return this.solutionCount;
  }

  public getMax(): number {
    return this.nQueensAnimation.solutionsTotal;
  }

  public destroy() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  public reset() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.frameNumber = 0;
    this.solutionCount = 0;

    this.setup();
    this.draw();
  }
}
