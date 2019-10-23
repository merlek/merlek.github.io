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
    isSub<T>(edit: number[][], src: T[], dst: T[]): boolean {
      return (
        src[this.i] !== dst[this.j] &&
        this.v === edit[this.i - 1][this.j - 1] + 1
      );
    }
    isKeep<T>(edit: number[][], src: T[], dst: T[]): boolean {
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
    hasSub<T>(edit: number[][], src: T[], dst: T[]): boolean {
      return (
        src[this.i + 1] !== dst[this.j + 1] &&
        this.v === edit[this.i + 1][this.j + 1] - 1
      );
    }
    hasKeep<T>(edit: number[][], src: T[], dst: T[]): boolean {
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

    public toEditPair(src: any[], dst: any[]): EditPair {
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

  type Path = EditSequenceNode[];
  export type PathList = Path[];
  type Edit = 'insert' | 'delete' | 'substitute' | 'keep' | undefined;
  type EditPair = [string, string];

  export class EditDistanceCalculator {
    constructor(src: string = 'ALGORITHM', dst: string = 'ALTRUISTIC') {
      this.src = Array.from(src);
      this.dst = Array.from(dst);

      this.src = [String.fromCharCode(0)].concat(this.src);
      this.dst = [String.fromCharCode(0)].concat(this.dst);

      this.m = this.src.length - 1;
      this.n = this.dst.length - 1;
      console.log(this.src, this.m);
      console.log(this.dst, this.n);
    }
    protected src: string[];
    protected dst: string[];
    protected n: number;
    protected m: number;

    protected static newAncestors(
      node: EditSequenceNode,
      ancestorsPathList: PathList = [[]]
    ): PathList {
      return ancestorsPathList.map(path => path.concat(node));
    }

    protected editTable(): number[][] {
      const edit: number[][] = [];

      edit[0] = [];
      for (let j = 0; j <= this.n; j++) {
        edit[0][j] = j;
      }
      for (let i = 1; i <= this.m; i++) {
        edit[i] = [];
        edit[i][0] = i;
        for (let j = 1; j <= this.n; j++) {
          const ins = edit[i][j - 1] + 1;
          const del = edit[i - 1][j] + 1;
          let rep = edit[i - 1][j - 1];
          if (this.src[i] !== this.dst[j]) {
            rep += 1;
          }
          edit[i][j] = Math.min(ins, del, rep);
        }
      }

      return edit;
    }

    public editDistance(): number {
      return this.editTable()[this.m][this.n];
    }

    public editSequence(
      pathList: PathList = this.shortestEditSequence()
    ): EditPair[][] {
      return pathList.map(path => {
        return path.map(node => {
          return node.toEditPair(this.src, this.dst);
        });
      });
    }

    public shortestEditSequence(
      i: number = 0,
      j: number = 0,
      ancestorsPathList: PathList = [[]],
      edit: number[][] = this.editTable()
    ): PathList {
      const node = new EditSequenceEndNode(i, j, edit[i][j]);

      if (ancestorsPathList.length === 0) {
        ancestorsPathList.push([]);
      }

      if (node.isEqual(this.m, this.n)) {
        return EditDistanceCalculator.newAncestors(node, ancestorsPathList);
      } else if (i >= this.m || j >= this.n) {
        return undefined;
      }

      const pathList: PathList = [];

      // insert
      if (node.hasInsert(edit)) {
        const ins = this.shortestEditSequence(
          i,
          j + 1,
          EditDistanceCalculator.newAncestors(
            node.asInsertSequence(),
            ancestorsPathList
          ),
          edit
        );
        if (ins) {
          pathList.push(...ins);
        }
      }

      // delete
      if (node.hasDelete(edit)) {
        const del = this.shortestEditSequence(
          i + 1,
          j,
          EditDistanceCalculator.newAncestors(
            node.asDeleteSequence(),
            ancestorsPathList
          ),
          edit
        );
        if (del) {
          pathList.push(...del);
        }
      }

      // substitute
      if (node.hasSub(edit, this.src, this.dst)) {
        const sub = this.shortestEditSequence(
          i + 1,
          j + 1,
          EditDistanceCalculator.newAncestors(
            node.asSubstituteSequence(),
            ancestorsPathList
          ),
          edit
        );
        if (sub) {
          pathList.push(...sub);
        }
      }

      // keep
      if (node.hasKeep(edit, this.src, this.dst)) {
        const k = this.shortestEditSequence(
          i + 1,
          j + 1,
          EditDistanceCalculator.newAncestors(
            node.asKeepSequence(),
            ancestorsPathList
          ),
          edit
        );
        if (k) {
          pathList.push(...k);
        }
      }

      if (pathList.length !== 0) {
        return pathList;
      } else {
        return undefined;
      }
    }

    public shortestEditTree(
      i: number = 0,
      j: number = 0,
      edit: number[][] = this.editTable()
    ): EditTreeNode {
      const node = new EditTreeNode(i, j, edit[i][j]);

      if (node.isEqual(this.m, this.n)) {
        return node;
      } else if (i >= this.m || j >= this.n) {
        return undefined;
      }

      // insertion
      if (node.hasInsert(edit)) {
        node.ins = this.shortestEditTree(i, j + 1, edit);
      }

      // deletion
      if (node.hasDelete(edit)) {
        node.del = this.shortestEditTree(i + 1, j, edit);
      }

      // substitution
      if (node.hasSub(edit, this.src, this.dst)) {
        node.sub = this.shortestEditTree(i + 1, j + 1, edit);
      }

      // keep
      if (node.hasKeep(edit, this.src, this.dst)) {
        node.keep = this.shortestEditTree(i + 1, j + 1, edit);
      }

      return node.hasChild() ? node : undefined;
    }
  }
}
