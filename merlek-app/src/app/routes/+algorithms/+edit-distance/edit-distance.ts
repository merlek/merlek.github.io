namespace EditDistance {
  export function toPrettyString(a: any[][]): string {
    let s = '';
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < a[0].length; j++) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < a.length; i++) {
        if (a[i][j] < 10) {
          s += ' ';
        }
        s += JSON.stringify(a[i][j]) + ', ';
      }
      s += '\n';
    }
    return s;
  }
  export abstract class EditNode {
    constructor(
      public readonly i: number,
      public readonly j: number,
      public readonly v: number
    ) {}

    isInsert(edit: number[][]): boolean {
      return this.v === edit[this.i][this.j - 1] + 1;
    }
    isDelete(edit: number[][]): boolean {
      return this.v === edit[this.i - 1][this.j] + 1;
    }
    isSub<T>(edit: number[][], src: string | T[], dst: string | T[]): boolean {
      return (
        src[this.i] !== dst[this.j] &&
        this.v === edit[this.i - 1][this.j - 1] + 1
      );
    }
    isKeep<T>(edit: number[][], src: string | T[], dst: string | T[]): boolean {
      return (
        src[this.i] === dst[this.j] && this.v === edit[this.i - 1][this.j - 1]
      );
    }
    hasInsert(edit: number[][]): boolean {
      return this.v === edit[this.i][this.j + 1] - 1;
    }
    hasDelete(edit: number[][]): boolean {
      return this.v === edit[this.i + 1][this.j] - 1;
    }
    hasSub<T>(edit: number[][], src: string | T[], dst: string | T[]): boolean {
      return (
        src[this.i + 1] !== dst[this.j + 1] &&
        this.v === edit[this.i + 1][this.j + 1] - 1
      );
    }
    hasKeep<T>(
      edit: number[][],
      src: string | T[],
      dst: string | T[]
    ): boolean {
      return (
        src[this.i + 1] === dst[this.j + 1] &&
        this.v === edit[this.i + 1][this.j + 1]
      );
    }
    public asInsertSequence(): EditSequenceNode {
      return new EditSequenceNode(this.i, this.j, this.v, 'insert');
    }
    public asDeleteSequence(): EditSequenceNode {
      return new EditSequenceNode(this.i, this.j, this.v, 'delete');
    }
    public asSubstituteSequence(): EditSequenceNode {
      return new EditSequenceNode(this.i, this.j, this.v, 'substitute');
    }
    public asKeepSequence(): EditSequenceNode {
      return new EditSequenceNode(this.i, this.j, this.v, 'keep');
    }
    public isEqual(m: number, n: number): boolean {
      return this.i === m && this.j === n;
    }
    public abstract hasChild(): boolean;
  }

  export class EditTreeNode extends EditNode {
    public ins?: EditTreeNode;
    public del?: EditTreeNode;
    public sub?: EditTreeNode;
    public keep?: EditTreeNode;
    public hasChild() {
      return (
        this.ins != null ||
        this.del != null ||
        this.sub != null ||
        this.keep != null
      );
    }
  }

  export class EditSequenceNode extends EditNode {
    constructor(i: number, j: number, v: number, public readonly edit: Edit) {
      super(i, j, v);
    }
    public hasChild() {
      return this.edit != null;
    }

    public toEditPair(src: string | any[], dst: string | any[]): EditPair {
      switch (this.edit) {
        case 'insert':
          return [' ', dst[this.j + 1]];
        case 'delete':
          return [src[this.i + 1], ' '];
        case 'substitute':
          return [src[this.i + 1], dst[this.j + 1]];
        case 'keep':
          return [src[this.i + 1], dst[this.j + 1]];
        default:
          return undefined;
      }
    }
  }

  export class EditSequenceEndNode extends EditSequenceNode {
    constructor(i: number, j: number, v: number) {
      super(i, j, v, undefined);
    }
  }

  export type Path = EditSequenceNode[];
  export type PathList = Path[];
  export type Edit = 'insert' | 'delete' | 'substitute' | 'keep' | undefined;
  export type EditPair = [string, string];
}
