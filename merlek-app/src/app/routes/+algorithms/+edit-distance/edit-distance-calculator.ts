import {
  EditPair,
  EditSequenceEndNode,
  EditSequenceNode,
  EditTreeNode,
  PathList
} from './edit-distance';

export class EditDistanceCalculator {
  protected src: string;
  protected dst: string;
  protected n: number;
  protected m: number;
  constructor(srcInput: string = '', dstInput: string = '') {
    this.src = String.fromCharCode(0).concat(srcInput);
    this.dst = String.fromCharCode(0).concat(dstInput);

    this.m = this.src.length - 1;
    this.n = this.dst.length - 1;
  }
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
    } else if (i > this.m || j > this.n) {
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
    } else if (i > this.m || j > this.n) {
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
