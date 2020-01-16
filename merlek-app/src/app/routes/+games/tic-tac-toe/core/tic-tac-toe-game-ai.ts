import { rnd } from 'app/lib/helpers';
import { Point } from '../../../../lib/canvas/point';
import { TicTacToeGameState } from './tic-tac-toe-game-state';

export class TicTacToeAI {
  constructor() {}

  public getNextMove(state: TicTacToeGameState): Point {
    return this.rndPos(state);
  }

  private rndPos(state: TicTacToeGameState): Point {
    return new Point(rnd(0)(state.cols), rnd(0)(state.rows));
  }
}
