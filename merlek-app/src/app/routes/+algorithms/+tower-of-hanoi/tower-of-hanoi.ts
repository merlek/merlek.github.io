class Peg {
  public diskIds: number[] = [];
  constructor(
    public readonly id: number,
    public x: number,
    public y: number,
    private readonly width: number,
    private readonly height: number,
    private readonly color = 'black'
  ) {}

  draw(ctx: CanvasRenderingContext2D, disks: Disk[]) {
    // Draw Peg
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.restore();

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

class Disk {
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
      this.y,
      this.centerX + this.width / 2,
      this.y + this.height
    );
    lingrad.addColorStop(0, this.selected ? this.color : 'grey');
    lingrad.addColorStop(1, 'white');

    ctx.fillStyle = lingrad;
    ctx.fillRect(x, this.y, this.width, this.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, this.y, this.width, this.height);

    ctx.restore();
  }
}

interface Frame {
  pegs: [
    { id: number; diskIds: number[] },
    { id: number; diskIds: number[] },
    { id: number; diskIds: number[] }
  ];
  selectedDiskId: number;
}

export class TowerOfHanoi {
  public readonly maxN = 10;
  public n = 5;
  public fps = 2; // (30 * 1000) / ((Math.pow(2, this.n) - 1) * 2);

  private readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number; // width of the canvas
  private readonly canvasHeight: number; // height of the canvas
  private pegs: Peg[] = [];
  private disks: Disk[] = [];
  private frames: Frame[] = [];
  private frameNumber = 0;
  private timeout: number;

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.setup();

    this.draw();
  }

  private setup() {
    // Setup Pegs
    const pegWidth = 5;
    const pegHeight = (this.canvasHeight * 3) / 4;
    const pegX = this.canvasWidth / 4;
    const pegY = this.canvasHeight - pegHeight;
    this.pegs.push(
      new Peg(0, pegX * 1, pegY, pegWidth, pegHeight),
      new Peg(1, pegX * 2, pegY, pegWidth, pegHeight),
      new Peg(2, pegX * 3, pegY, pegWidth, pegHeight)
    );

    // Setup Disks
    const diskWidth = this.canvasWidth / 4;
    const diskHeight = (pegHeight * 0.95) / this.n;
    for (let i = 0; i < this.n; i++) {
      this.disks.push(
        new Disk(i, (diskWidth * (this.n - i)) / this.n, diskHeight)
      );
      this.pegs[0].diskIds.push(i);
    }

    this.disks[0].selected = true;

    this.addFrame(this.n, this.pegs[0], this.pegs[2], this.pegs[1]);

    this.hanoi(this.n, this.pegs[0], this.pegs[2], this.pegs[1]);
  }

  /**
   * Draw step of the animation
   */
  private draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Step
    this.stepFrame();

    // Draw
    this.pegs.forEach(peg => {
      peg.draw(this.ctx, this.disks);
    });

    if (this.frameNumber < this.frames.length) {
      this.timeout = window.setTimeout(() => this.draw(), 1000 / this.fps);
    }
  }

  private stepFrame() {
    const frame = this.frames[this.frameNumber++];

    for (let i = 0; i < this.pegs.length; i++) {
      const peg = frame.pegs[i];
      this.pegs[peg.id].diskIds = peg.diskIds;
    }
    this.disks.forEach(disk => {
      disk.selected =
        disk.id === frame.selectedDiskId ||
        this.frameNumber === 1 ||
        this.frameNumber >= this.frames.length;
    });

    return frame;
  }

  private hanoi(n: number, src: Peg, dst: Peg, tmp: Peg) {
    if (n > 0) {
      this.hanoi(n - 1, src, tmp, dst);

      // move disk n from src to dst
      const diskN = src.diskIds[src.diskIds.length - 1];
      this.addFrame(diskN, src, dst, tmp);

      src.diskIds.pop();
      dst.diskIds.push(diskN);
      this.addFrame(diskN, src, dst, tmp);

      this.hanoi(n - 1, tmp, dst, src);
    }
  }

  private addFrame(diskN: number, src: Peg, dst: Peg, tmp: Peg) {
    const frame: Frame = {
      pegs: [
        { id: src.id, diskIds: Array.from(src.diskIds) },
        { id: dst.id, diskIds: Array.from(dst.diskIds) },
        { id: tmp.id, diskIds: Array.from(tmp.diskIds) }
      ],
      selectedDiskId: diskN
    };
    this.frames.push(frame);
  }

  public getProgress(): number {
    // tslint:disable-next-line:no-bitwise
    return (this.frameNumber / 2) | 0;
  }

  public getMax(): number {
    // tslint:disable-next-line:no-bitwise
    return (this.frames.length / 2) | 0;
  }

  public reset() {
    console.log('reset');
    window.clearTimeout(this.timeout);

    this.pegs = [];
    this.disks = [];
    this.frames = [];
    this.frameNumber = 0;

    // this.interval = (30 * 1000) / ((Math.pow(2, this.n) - 1) * 2);

    this.setup();

    this.draw();
  }
}
