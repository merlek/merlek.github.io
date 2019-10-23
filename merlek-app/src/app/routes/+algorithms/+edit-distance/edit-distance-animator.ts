import { EditPair } from './edit-distance';

class WordAnimator {
  private static readonly fontBase = 600 / 10;
  private static readonly fontSize = 70;
  private readonly x: number;
  private readonly y: number;
  private readonly letterSize: number;

  constructor(
    private readonly position: 0 | 1,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
    private readonly word: string | any[]
  ) {
    this.letterSize = Math.min(
      this.canvasWidth / this.word.length,
      this.canvasHeight / 2
    );

    this.x = this.canvasWidth / 2 - (this.letterSize * this.word.length) / 2;
    this.y =
      this.canvasHeight / 4 -
      this.letterSize / 2 +
      (this.position * this.canvasHeight) / 2;
  }

  private getFont() {
    const ratio = WordAnimator.fontSize / WordAnimator.fontBase; // calc ratio
    const size = this.letterSize * ratio; // this.canvasWidth * ratio; // get font size based on current width
    // tslint:disable-next-line:no-bitwise
    return (size | 0) + 'px sans-serif'; // set font
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw Board
    ctx.save();

    ctx.fillStyle = '#A4DBEC';
    ctx.strokeStyle = 'black';

    for (let i = 0; i < this.word.length; i++) {
      const x = this.x + this.letterSize * i;
      const y = this.y;
      const w = this.letterSize;
      ctx.fillRect(x, y, w, w);
      ctx.strokeRect(x, y, w, w);
    }

    ctx.fillStyle = 'black';
    ctx.font = this.getFont();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    // const text = ctx.measureText(this.word[0]); // TextMetrics object
    // console.log(text);

    for (let i = 0; i < this.word.length; i++) {
      const x = this.x + this.letterSize * i + this.letterSize / 2;
      const y = this.y + this.letterSize * 0.9;
      const w = this.letterSize;
      ctx.fillText(this.word[i], x, y, w);
    }

    ctx.restore();
  }
}

type EditDistanceAnimation = [string, string];

export class EditDistanceAnimator {
  public fps = 30;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private editDistanceAnimation: EditPair[];
  private wordAnimator: WordAnimator;
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

  public startAnimation(editDistanceAnimation: EditPair[]) {
    this.editDistanceAnimation = editDistanceAnimation;
    this.reset();
  }

  private setup() {
    // let word1 = '';
    // let word2 = '';
    // let edits = [];

    const edits = this.editDistanceAnimation.reduce((p, c) => {
      if (c) {
        p[0].push(c.src);
        p[1].push(c.dst);
        p[2].push(c.edit);
      }
      return p;
    }, Array.of([], [], []));

    console.log(edits[0].join(''));

    this.wordAnimator = new WordAnimator(
      0,
      this.canvasWidth,
      this.canvasHeight,
      edits[0].join('')
    );

    this.wordAnimator.draw(this.backgroundCtx);

    this.wordAnimator = new WordAnimator(
      1,
      this.canvasWidth,
      this.canvasHeight,
      edits[1].join('')
    );

    this.wordAnimator.draw(this.backgroundCtx);
  }

  /**
   * Draw step of the animation
   */
  private draw() {
    this.gameCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Step
    // const frame = this.stepFrame();

    // Draw
    // this.boardAnimator.drawQueens(this.gameCtx, frame.queens, frame.solution);

    // if (this.frameNumber < this.editDistanceAnimation.animationFrames.length) {
    //   this.timeout = window.setTimeout(() => this.draw(), 1000 / this.fps);
    //   // TODO change to requestAnimationFrame
    //   // https://developer.mozilla.org/en-US/docs/Games/Techniques/Efficient_animation_for_web_games
    // }
  }

  // private stepFrame() {
  //   const frame = this.editDistanceAnimation.animationFrames[this.frameNumber++];
  //   if (frame.solution) {
  //     if (!this.lastFrameSolution) {
  //       this.solutionCount++;
  //     }
  //     this.lastFrameSolution = true;
  //   } else {
  //     this.lastFrameSolution = false;
  //   }
  //   return frame;
  // }

  public getProgress(): number {
    return this.solutionCount;
  }

  public getMax(): number {
    return this.editDistanceAnimation.length;
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
