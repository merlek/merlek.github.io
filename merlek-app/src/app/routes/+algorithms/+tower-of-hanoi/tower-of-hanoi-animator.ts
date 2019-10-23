import {
  TowerOfHanoiFrame,
  TowerOfHanoiAnimation
} from './tower-of-hanoi-animation-builder';

class PegAnimator {
  public diskIds: number[] = [];
  constructor(
    public readonly id: number,
    public x: number,
    public y: number,
    private readonly width: number,
    private readonly height: number
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    // Draw Peg
    ctx.save();

    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    const lingrad = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x + this.width / 2,
      this.y
    );

    lingrad.addColorStop(0, 'black');
    lingrad.addColorStop(1, '#8B4513');

    ctx.fillStyle = lingrad;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.restore();
  }

  drawDisks(ctx: CanvasRenderingContext2D, disks: DiskAnimator[]) {
    // Draw Disks
    const x = this.x + this.width / 2;
    let y = this.y + this.height;
    this.diskIds.forEach(diskId => {
      const disk = disks[diskId];
      disk.centerX = x;
      disk.y = y - disk.height;
      disk.draw(ctx);
      y -= disk.height;
    });
  }
}

class DiskAnimator {
  public y = 0;
  public centerX = 0;
  public selected = true;
  constructor(
    public readonly id: number,
    public readonly width: number,
    public readonly height: number,
    public readonly color = 'orange'
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const x = this.centerX - this.width / 2;

    const lingrad = ctx.createLinearGradient(
      x,
      this.y + this.height,
      this.centerX + this.width / 2,
      this.y
    );

    lingrad.addColorStop(0, 'grey');
    lingrad.addColorStop(0.5, this.color);
    lingrad.addColorStop(1, 'white');

    ctx.fillStyle = lingrad;
    ctx.fillRect(x, this.y, this.width, this.height);

    if (this.selected) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'gold';
    } else {
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
    }
    ctx.strokeRect(x, this.y, this.width, this.height);

    ctx.restore();
  }
}

export class TowerOfHanoiAnimator {
  public fps = 2;

  private readonly backgroundCtx: CanvasRenderingContext2D;
  private readonly gameCtx: CanvasRenderingContext2D;
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private towerOfHanoiAnimation: TowerOfHanoiAnimation;
  private pegAnimators: PegAnimator[] = [];
  private diskAnimators: DiskAnimator[] = [];
  private frameNumber = 0;
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

  public startAnimation(towerOfHanoiAnimation: TowerOfHanoiAnimation) {
    this.towerOfHanoiAnimation = towerOfHanoiAnimation;
    this.reset();
  }

  private setup() {
    // Setup Pegs
    const pegWidth = this.canvasWidth / 120;
    const pegHeight = (this.canvasHeight * 3) / 4;
    const pegX = this.canvasWidth / 4;
    const pegY = this.canvasHeight - pegHeight;
    this.pegAnimators.push(
      new PegAnimator(0, pegX * 1, pegY, pegWidth, pegHeight),
      new PegAnimator(1, pegX * 2, pegY, pegWidth, pegHeight),
      new PegAnimator(2, pegX * 3, pegY, pegWidth, pegHeight)
    );

    this.pegAnimators.forEach(peg => {
      peg.draw(this.backgroundCtx);
    });

    // Setup Disks
    const diskWidth = this.canvasWidth / 4;
    const diskHeight =
      (pegHeight * 0.95) / this.towerOfHanoiAnimation.numberOfDisks;
    for (let i = 0; i < this.towerOfHanoiAnimation.numberOfDisks; i++) {
      this.diskAnimators.push(
        new DiskAnimator(
          i,
          (diskWidth * (this.towerOfHanoiAnimation.numberOfDisks - i)) /
            this.towerOfHanoiAnimation.numberOfDisks,
          diskHeight,
          'hsl(' +
            (i / this.towerOfHanoiAnimation.numberOfDisks) * 360 +
            ',100%,50%)'
        )
      );
      this.pegAnimators[0].diskIds.push(i);
    }

    this.diskAnimators[0].selected = true;
  }

  /**
   * Draw step of the animation
   */
  private draw() {
    this.gameCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Step
    this.stepFrame();

    // Draw
    this.pegAnimators.forEach(peg => {
      peg.drawDisks(this.gameCtx, this.diskAnimators);
    });

    if (this.frameNumber < this.towerOfHanoiAnimation.animationFrames.length) {
      this.timeout = window.setTimeout(() => this.draw(), 1000 / this.fps);
      // TODO change to requestAnimationFrame
      // https://developer.mozilla.org/en-US/docs/Games/Techniques/Efficient_animation_for_web_games
    }
  }

  private stepFrame() {
    const frame = this.towerOfHanoiAnimation.animationFrames[
      this.frameNumber++
    ];

    for (let i = 0; i < this.pegAnimators.length; i++) {
      this.pegAnimators[i].diskIds = frame.pegs[i];
    }
    this.diskAnimators.forEach(disk => {
      disk.selected =
        disk.id === frame.selectedDiskId ||
        this.frameNumber === 1 ||
        this.frameNumber >= this.towerOfHanoiAnimation.animationFrames.length;
    });

    return frame;
  }

  public getProgress(): number {
    // tslint:disable-next-line:no-bitwise
    return (this.frameNumber / 2) | 0;
  }

  public getMax(): number {
    // tslint:disable-next-line:no-bitwise
    return (this.towerOfHanoiAnimation.animationFrames.length / 2) | 0;
  }

  public reset() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.pegAnimators = [];
    this.diskAnimators = [];
    this.frameNumber = 0;

    this.setup();
    this.draw();
  }

  public destroy() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }
}
