export interface NQueensAnimation {
  numberOfQueens: number;
  animationFrames: NQueensFrame[];
  solutionsTotal: number;
}
export interface NQueensFrame {
  queens: number[];
  solution: boolean;
}
export class NQueensAnimationBuilder {
  private frames: NQueensFrame[] = [];
  private constructor(public readonly n: number) {}

  public static getAnimation(n: number = 8) {
    return new NQueensAnimationBuilder(n).build();
  }
  private build(): NQueensAnimation {
    this.frames = [];
    this.addFrame([], false);

    const solutions = this.placeQueens();

    return {
      numberOfQueens: this.n,
      animationFrames: this.frames,
      solutionsTotal: solutions.length
    };
  }
  private placeQueens(
    queens: number[] = [],
    row: number = 0,
    solutions: number[][] = []
  ): number[][] {
    if (row === this.n) {
      solutions.push(Array.from(queens));
      for (let index = 0; index < this.n; index++) {
        this.addFrame(queens, true);
      }
    } else {
      queens.fill(undefined, row, this.n);
      for (let x = 0; x < this.n; x++) {
        let legal = true;
        // queens[r] = x;
        // this.addFrame(queens, false);
        for (let y = 0; y < row; y++) {
          if (
            queens[y] === x ||
            queens[y] === x + row - y ||
            queens[y] === x - row + y
          ) {
            legal = false;
          }
        }
        if (legal) {
          queens[row] = x;
          this.addFrame(queens, false);
          this.placeQueens(queens, row + 1, solutions);
        }
      }
    }
    return solutions;
  }
  private addFrame(queens: number[], solution: boolean) {
    const frame: NQueensFrame = {
      queens: Array.from(queens),
      solution
    };
    this.frames.push(frame);
  }
}
