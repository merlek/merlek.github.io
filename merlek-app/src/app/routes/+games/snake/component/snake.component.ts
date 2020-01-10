import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { CookieManager } from 'app/lib/cookie';
import { SnakeAnimator } from '../animation/snake-animator';

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
    this.scaleCanvas();

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
  @HostListener('window:resize', ['$event'])
  scaleCanvas(event?: Event) {
    const menu = document.getElementById('menu');
    const main = document.getElementById('main');
    const stage = <HTMLCanvasElement>document.getElementById('stage');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    // const scaleX = window.innerWidth / backgroundCanvas.width;
    const scaleY =
      (window.innerHeight - menu.offsetHeight - 10) / backgroundCanvas.height;
    const scaleX = main.offsetWidth / backgroundCanvas.width;
    // const scaleY = main.offsetHeight / backgroundCanvas.height;

    const scaleToFit = Math.min(scaleX, scaleY);
    const scaleToCover = Math.max(scaleX, scaleY);

    stage.style.transformOrigin = '0 0'; // scale from top left
    stage.style.transform = 'scale(' + scaleToFit + ')';
  }
}
