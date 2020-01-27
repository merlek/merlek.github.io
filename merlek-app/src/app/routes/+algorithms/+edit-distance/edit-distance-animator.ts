import { EditPair } from './edit-distance';
import { EditDistanceBase64Images } from './edit-distance-base64-images';
import { ImageLoader } from 'canvas-tools';

class WordAnimator {
  private static readonly ImageLoader = new ImageLoader({
    insert: EditDistanceBase64Images.plus,
    delete: EditDistanceBase64Images.times,
    substitute: EditDistanceBase64Images.exchange
  });

  private static readonly editColorMap = {
    insert: '#D4EDDA',
    delete: '#F8D7DA',
    substitute: '#FFF3CD',
    keep: 'white'
  };
  private static readonly fontBase = 600 / 10;
  private static readonly fontSize = 70;
  private readonly x: number;
  private y: number;
  private readonly letterSize: number;

  constructor(
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
    private readonly srcWord: string | any[],
    private readonly dstWord: string | any[],
    private readonly edits: string[]
  ) {
    if (this.srcWord.length !== this.dstWord.length) {
      throw new Error(
        'Word lengths differ: srcWord.length=' +
          this.srcWord.length +
          ', dstWord.length=' +
          this.dstWord.length
      );
    }
    // 'words' here should have the same length
    this.letterSize = Math.min(
      this.canvasWidth / this.srcWord.length,
      this.canvasWidth / this.dstWord.length,
      this.canvasHeight / 2
    );

    this.x = this.canvasWidth / 2 - (this.letterSize * this.srcWord.length) / 2;
  }

  private static getFont(letterSize: number) {
    const ratio = WordAnimator.fontSize / WordAnimator.fontBase; // calc ratio
    const size = letterSize * ratio; // this.canvasWidth * ratio; // get font size based on current width
    return Math.floor(size) + 'px sans-serif'; // set font
  }

  draw(ctx: CanvasRenderingContext2D) {
    const y0 = this.calcY(0);
    const y1 = this.calcY(1);

    this.y = y0;
    this.drawWord(ctx, this.srcWord);

    this.drawEdits(ctx, y0 + this.letterSize, y1);

    this.y = y1;
    this.drawWord(ctx, this.dstWord);
  }
  drawWord(ctx: CanvasRenderingContext2D, word: string | any[]) {
    ctx.save();

    ctx.strokeStyle = 'black';

    const w = this.letterSize;
    let y = this.y;

    for (let i = 0; i < word.length; i++) {
      if (this.edits[i] !== 'keep') {
        const x = this.x + w * i;
        ctx.fillStyle = WordAnimator.editColorMap[this.edits[i]] || 'black';
        ctx.fillRect(x, y, w, w);
        ctx.strokeRect(x, y, w, w);
      }
    }

    ctx.fillStyle = 'black';
    ctx.font = WordAnimator.getFont(w);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    y = this.y + w * 0.9;

    for (let i = 0; i < word.length; i++) {
      const x = this.x + w * i + w / 2;
      ctx.fillText(word[i], x, y, w);
    }

    ctx.restore();
  }

  drawEdits(ctx: CanvasRenderingContext2D, y1: number, y2: number) {
    // distance between top and bottom of words
    const d = y2 - y1;
    let w = Math.min(this.letterSize, d);
    let y = y1 + (y2 - y1) / 2 - w / 2;

    if (y1 <= y && y <= y2) {
      // Draw Board
      ctx.save();

      ctx.strokeStyle = 'black';

      for (let i = 0; i < this.edits.length; i++) {
        if (this.edits[i] !== 'keep') {
          const x =
            this.x + this.letterSize * i + (this.letterSize / 2 - w / 2);
          ctx.fillStyle = WordAnimator.editColorMap[this.edits[i]] || 'black';
          ctx.fillRect(x, y, w, w);
          ctx.strokeRect(x, y, w, w);
        }
      }

      ctx.fillStyle = 'black';
      ctx.font = WordAnimator.getFont(w);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';

      const scale = 0.9;
      w = w * scale;
      y = y + (w * (1 - scale)) / 2;

      for (let i = 0; i < this.edits.length; i++) {
        const edit = this.edits[i];
        const x = this.x + this.letterSize * i + (this.letterSize / 2 - w / 2);

        if (WordAnimator.ImageLoader.hasImage(edit)) {
          WordAnimator.ImageLoader.onLoad(function(images) {
            ctx.drawImage(images[edit], x, y, w, w);
          });
        }
      }

      ctx.restore();
    }
  }

  private calcY(position: 0 | 1) {
    return (
      this.canvasHeight / 4 -
      this.letterSize / 2 +
      (position * this.canvasHeight) / 2
    );
  }
}

export class EditDistanceAnimator {
  public fps = 30;
  private readonly backgroundCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly gameCtx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private editDistanceAnimation: EditPair[][];
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

  public startAnimation(editDistanceAnimation: EditPair[][]) {
    this.editDistanceAnimation = editDistanceAnimation;
    this.reset();
  }

  private setup() {
    // let word1 = '';
    // let word2 = '';
    // let edits = [];

    const edits = this.editDistanceAnimation[this.solutionCount].reduce<
      string[][]
    >((p, c) => {
      if (c) {
        p[0].push(c.src);
        p[1].push(c.dst);
        p[2].push(c.edit);
      }
      return p;
    }, Array.of([], [], []));

    this.wordAnimator = new WordAnimator(
      this.canvasWidth,
      this.canvasHeight,
      edits[0].join(''),
      edits[1].join(''),
      edits[2]
    );
  }

  /**
   * Draw step of the animation
   */
  private draw() {
    this.gameCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // Step
    // const frame = this.stepFrame();

    // Draw
    this.wordAnimator.draw(this.gameCtx);

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
    this.softReset();
    this.solutionCount = 0;
  }

  private softReset() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.frameNumber = 0;

    this.setup();
    this.draw();
  }

  public previous() {
    this.solutionCount =
      (this.solutionCount - 1) % this.editDistanceAnimation.length;
    this.softReset();
  }
  public next() {
    this.solutionCount =
      (this.solutionCount + 1) % this.editDistanceAnimation.length;
    this.softReset();
  }
}
