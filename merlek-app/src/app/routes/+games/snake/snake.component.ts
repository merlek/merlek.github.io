import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnakeAnimator } from './snake-animator';
import { State } from './snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnDestroy {
  private _highScore = 0;
  animator: SnakeAnimator;
  constructor() {}

  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    this.animator = new SnakeAnimator(gameCanvas, backgroundCanvas);

    window.addEventListener('keydown', e => this.animator.keyEvent(e.key));

    this.animator.start();
  }
  ngOnDestroy(): void {
    this.animator.destroy();
  }
  get score() {
    return this.animator.state.snake.length;
  }
  get highScore() {
    if (this.score > this._highScore) {
      this._highScore = this.score;
    }
    return this._highScore;
  }
}
