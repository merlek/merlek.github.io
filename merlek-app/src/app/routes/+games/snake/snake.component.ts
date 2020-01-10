import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnakeAnimator } from './snake-animator';
import { CookieManager } from 'app/lib/cookie';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnDestroy {
  private static readonly COOKIE_NAME = 'snake-high-score';
  private _highScore = 0;
  animator: SnakeAnimator;
  constructor() {}

  ngOnInit() {
    this.animator = new SnakeAnimator(
      <HTMLCanvasElement>document.getElementById('game-layer'),
      <HTMLCanvasElement>document.getElementById('background-layer'),
      <HTMLCanvasElement>document.getElementById('ui-layer')
    );

    window.addEventListener('keydown', e => {
      if (this.animator.keyEvent(e.key)) {
        e.preventDefault();
      }
    });

    this.animator.start();

    this.highScore = +CookieManager.getCookie(SnakeComponent.COOKIE_NAME);
  }
  ngOnDestroy(): void {
    this.animator.destroy();
  }
  get score() {
    return Math.max(...this.animator.state.snakes.map(s => s.snake.length));
  }
  set score(v: number) {}
  get highScore() {
    if (this.score > this._highScore) {
      this._highScore = this.score;
      CookieManager.setCookie(SnakeComponent.COOKIE_NAME, this._highScore, 90);
    }
    return this._highScore;
  }
  set highScore(v: number) {
    this._highScore = v;
  }
}
