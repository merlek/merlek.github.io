import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnakeAnimator } from './snake-animator';
import { State } from './snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnDestroy {
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
}
