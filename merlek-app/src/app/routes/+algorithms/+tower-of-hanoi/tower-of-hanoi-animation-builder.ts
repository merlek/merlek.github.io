export interface TowerOfHanoiAnimation {
  numberOfDisks: number;
  animationFrames: TowerOfHanoiFrame[];
}

export interface TowerOfHanoiFrame {
  pegs: number[][];
  selectedDiskId: number;
}
type Peg = number[];

export class TowerOfHanoiAnimationBuilder {
  private pegs: Peg[] = [];
  private frames: TowerOfHanoiFrame[] = [];

  private constructor(public n: number = 5) {}

  public static getAnimation(n: number = 8): TowerOfHanoiAnimation {
    return new TowerOfHanoiAnimationBuilder(n).build();
  }

  private build(): TowerOfHanoiAnimation {
    // Setup Pegs
    for (let i = 0; i < 3; i++) {
      this.pegs.push([]);
    }

    // Setup Disks
    for (let i = 0; i < this.n; i++) {
      this.pegs[0].push(i);
    }

    this.addFrame(this.n, 0, 2, 1);

    this.hanoi(this.n, 0, 2, 1);

    return {
      numberOfDisks: this.n,
      animationFrames: this.frames
    };
  }
  private hanoi(n: number, src: number, dst: number, tmp: number) {
    if (n > 0) {
      this.hanoi(n - 1, src, tmp, dst);

      // move disk n from src to dst

      const selectedDiskId = this.pegs[src][this.pegs[src].length - 1];
      this.addFrame(selectedDiskId, src, dst, tmp);

      this.pegs[src].pop();
      this.pegs[dst].push(selectedDiskId);
      this.addFrame(selectedDiskId, src, dst, tmp);

      this.hanoi(n - 1, tmp, dst, src);
    }
  }
  private addFrame(
    selectedDiskId: number,
    src: number,
    dst: number,
    tmp: number
  ) {
    const pegs = [];
    pegs[src] = Array.from(this.pegs[src]);
    pegs[dst] = Array.from(this.pegs[dst]);
    pegs[tmp] = Array.from(this.pegs[tmp]);
    this.frames.push({
      pegs: pegs,
      selectedDiskId: selectedDiskId
    });
  }
}
