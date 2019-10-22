type Coordinates = { x: number; y: number } & {
  [key: string]: number;
};

class Board {
  private readonly x: number;
  private readonly y: number;
  private readonly squareSide: number;
  private readonly boardSide: number;

  constructor(
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
    private readonly n: number
  ) {
    this.squareSide = Math.min(this.canvasWidth, this.canvasHeight) / this.n;
    this.boardSide = this.squareSide * this.n;

    this.x = canvasWidth / 2 - this.boardSide / 2;
    this.y = 0;
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
      ctx.fillStyle = 'gold';
    } else {
      ctx.fillStyle = 'white';
    }
    ctx.strokeStyle = 'black';

    queens.forEach((x, y) => {
      this.drawQueen(ctx, x, y);
    });

    ctx.restore();
  }
  private drawQueen(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath();

    // Draws a ball
    ctx.arc(
      this.x + this.squareSide / 2 + x * this.squareSide,
      this.y + this.squareSide / 2 + y * this.squareSide,
      (this.squareSide / 2) * 0.9,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();

    // Colors and fills the ball
    ctx.fill();
    ctx.stroke();
  }
}

interface Frame {
  queens: number[];
  solution: boolean;
}

export class NQueens {
  public readonly maxN = 10;
  public n = 8;
  public fps = 2;

  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private board: Board;
  private frames: Frame[] = [];
  private frameNumber = 0;
  private solutionCount = 0;
  private solutionTotal = 0;
  private lastFrameSolution = false;
  private timeout: number;

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(
    gameCanvas: HTMLCanvasElement,
    backgroundCanvas: HTMLCanvasElement
  ) {
    this.backgroundCtx = backgroundCanvas.getContext('2d');
    this.canvasWidth = backgroundCanvas.width;
    this.canvasHeight = backgroundCanvas.height;

    this.gameCtx = gameCanvas.getContext('2d');

    this.setup();

    this.draw();
  }

  private setup() {
    // Setup Board
    const boardWidth = this.canvasWidth;
    const boardHeight = this.canvasHeight;
    this.board = new Board(boardWidth, boardHeight, this.n);

    this.board.drawBoard(this.backgroundCtx);

    // Setup Queens
    this.addFrame([], false);

    const solutions = this.placeQueens();
    this.solutionTotal = solutions.length;
    this.solutionCount = 0;
  }

  /**
   * Draw step of the animation
   */
  private draw() {
    this.gameCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Step
    const frame = this.stepFrame();

    // Draw
    this.board.drawQueens(this.gameCtx, frame.queens, frame.solution);

    if (this.frameNumber < this.frames.length) {
      this.timeout = window.setTimeout(() => this.draw(), 1000 / this.fps);
      // TODO change to requestAnimationFrame
      // https://developer.mozilla.org/en-US/docs/Games/Techniques/Efficient_animation_for_web_games
    }
  }

  private stepFrame() {
    const frame = this.frames[this.frameNumber++];
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

  placeQueens(
    queens: number[] = [],
    r: number = 0,
    solutions: number[][] = []
  ): number[][] {
    if (r === this.n) {
      solutions.push(Object.assign([], queens));
      for (let index = 0; index < this.n; index++) {
        this.addFrame(queens, true);
      }
    } else {
      queens.fill(undefined, r, this.n);
      for (let x = 0; x < this.n; x++) {
        let legal = true;
        for (let y = 0; y < r; y++) {
          if (
            queens[y] === x ||
            queens[y] === x + r - y ||
            queens[y] === x - r + y
          ) {
            legal = false;
          }
        }
        if (legal) {
          queens[r] = x;
          this.addFrame(queens, false);
          this.placeQueens(queens, r + 1, solutions);
        }
      }
    }
    return solutions;
  }

  private addFrame(queens: number[], solution: boolean) {
    const frame: Frame = {
      queens: Object.assign([], queens),
      solution
    };
    this.frames.push(frame);
  }

  public getProgress(): number {
    // tslint:disable-next-line:no-bitwise
    // return (this.frameNumber / 2) | 0;
    return this.solutionCount;
  }

  public getMax(): number {
    // tslint:disable-next-line:no-bitwise
    // return (this.frames.length / 2) | 0;
    return this.solutionTotal;
  }

  public reset() {
    window.clearTimeout(this.timeout);

    this.frames = [];
    this.frameNumber = 0;

    this.setup();

    this.draw();
  }
}
