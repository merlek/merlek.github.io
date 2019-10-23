namespace EditDistance {
  export class ReverseEditDistanceCalculator extends EditDistanceCalculator {
    public reverseShortestEditSequence(
      i: number = this.m,
      j: number = this.n,
      ancestorsPathList: PathList = [[]],
      edit: number[][] = this.editTable()
    ): PathList {
      const node = new EditSequenceEndNode(i, j, edit[i][j]);

      if (ancestorsPathList.length === 0) {
        ancestorsPathList.push([]);
      }

      if (node.isEqual(0, 0)) {
        return ReverseEditDistanceCalculator.newAncestors(
          node,
          ancestorsPathList
        );
      } else if (i < 0 || j < 0) {
        return undefined;
      }

      const pathList: PathList = [];

      if (node.isInsert(edit)) {
        const ins = this.reverseShortestEditSequence(
          i,
          j - 1,
          ReverseEditDistanceCalculator.newAncestors(
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
      if (node.isDelete(edit)) {
        const del = this.reverseShortestEditSequence(
          i - 1,
          j,
          ReverseEditDistanceCalculator.newAncestors(
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
      if (node.isSub(edit, this.src, this.dst)) {
        const sub = this.reverseShortestEditSequence(
          i - 1,
          j - 1,
          ReverseEditDistanceCalculator.newAncestors(
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
      if (node.isKeep(edit, this.src, this.dst)) {
        const sub = this.reverseShortestEditSequence(
          i - 1,
          j - 1,
          ReverseEditDistanceCalculator.newAncestors(
            node.asKeepSequence(),
            ancestorsPathList
          ),
          edit
        );
        if (sub) {
          pathList.push(...sub);
        }
      }

      if (pathList.length !== 0) {
        return pathList;
      } else {
        return undefined;
      }
    }

    public reverseShortestEditTree(
      i: number = this.m,
      j: number = this.n,
      edit: number[][] = this.editTable()
    ): EditTreeNode {
      const node = new EditTreeNode(i, j, edit[i][j]);

      if (node.isEqual(0, 0)) {
        return node;
      } else if (i < 0 || j < 0) {
        return undefined;
      }

      // insertion
      if (node.isInsert(edit)) {
        node.ins = this.reverseShortestEditTree(i, j - 1, edit);
      }

      // deletion
      if (node.isDelete(edit)) {
        node.del = this.reverseShortestEditTree(i - 1, j, edit);
      }

      // substitution
      if (node.isSub(edit, this.src, this.dst)) {
        node.sub = this.reverseShortestEditTree(i - 1, j - 1, edit);
      }

      // keep
      if (node.isKeep(edit, this.src, this.dst)) {
        node.keep = this.reverseShortestEditTree(i - 1, j - 1, edit);
      }

      return node.hasChild() ? node : undefined;
    }
  }
}
