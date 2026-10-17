import { EditDistanceCalculator } from '../routes/+algorithms/+edit-distance/edit-distance-calculator';
import { NQueensAnimationBuilder } from '../routes/+algorithms/+n-queens/n-queens-animation-builder';
import { TowerOfHanoiAnimationBuilder } from '../routes/+algorithms/+tower-of-hanoi/tower-of-hanoi-animation-builder';
import { Snake, Directions } from '../routes/+games/snake/core/snake';
import { SnakeGameState } from '../routes/+games/snake/core/snake-game-state';
import { TicTacToeGameState } from '../routes/+games/tic-tac-toe/core/tic-tac-toe-game-state';
import { TicTacToeAI } from '../routes/+games/tic-tac-toe/core/tic-tac-toe-game-ai';

describe('Demo behavior after dependency migration', () => {
  it.each([['', '', 0], ['', 'abc', 3], ['kitten', 'sitting', 3], ['same', 'same', 0]])(
    'computes edit distance from %s to %s', (source, target, expected) => {
      expect(new EditDistanceCalculator(source as string, target as string).editDistance()).toBe(expected);
    }
  );

  it('finds the known N Queens solution counts', () => {
    expect(NQueensAnimationBuilder.getAnimation(4).solutionsTotal).toBe(2);
    expect(NQueensAnimationBuilder.getAnimation(8).solutionsTotal).toBe(92);
  });

  it('finishes Hanoi with every disk on the destination peg', () => {
    const frames = TowerOfHanoiAnimationBuilder.getAnimation(3).animationFrames;
    expect(frames.at(-1).pegs).toEqual([[], [], [0, 1, 2]]);
  });

  it('wraps a snake across the board edge and keeps the previous state intact', () => {
    const snake = new Snake(3, 3, [Directions.WEST], {x: 0, y: 1}, [{x: 0, y: 1}]);
    expect(snake.next(3, 3, []).snake).toEqual([{x: 2, y: 1}]);
    expect(snake.snake).toEqual([{x: 0, y: 1}]);
  });

  it('advances random game states without invalid positions after the randomInt API change', () => {
    let state = new SnakeGameState(true);
    for (let i = 0; i < 30; i++) {
      state = state.next();
      expect(state.apples.every(p => p.x >= 0 && p.x < state.cols && p.y >= 0 && p.y < state.rows)).toBe(true);
    }
  });

  it('detects a win and rejects subsequent moves', () => {
    const game = new TicTacToeGameState();
    [{x:0,y:0}, {x:1,y:0}, {x:0,y:1}, {x:1,y:1}, {x:0,y:2}].forEach(p => game.takeTurn(p));
    expect(game.winner).toBe('X');
    game.takeTurn({x:2,y:2});
    expect(game.get({x:2,y:2})).toBeUndefined();
  });

  it('lets the AI produce a legal opening move', () => {
    const game = new TicTacToeAI(3, 3, 0);
    game.takeTurn();
    expect(game.getAvailableMoves()).toHaveLength(8);
    expect(game.winner).toBeUndefined();
  });
});
