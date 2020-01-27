import { Component, OnDestroy, OnInit } from '@angular/core';
import { NQueensAnimationBuilder } from '../n-queens-animation-builder';
import { NQueensAnimator } from '../n-queens-animator';

@Component({
  selector: 'app-n-queens',
  templateUrl: './n-queens.component.html',
  styleUrls: ['./n-queens.component.scss']
})
export class NQueensComponent implements OnInit, OnDestroy {
  n = 8;
  animator: NQueensAnimator;
  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );
    this.animator = new NQueensAnimator(gameCanvas, backgroundCanvas);
    this.animator.startAnimation(NQueensAnimationBuilder.getAnimation(this.n));
  }

  ngOnDestroy(): void {
    this.animator.destroy();
  }

  reset() {
    this.animator.startAnimation(NQueensAnimationBuilder.getAnimation(this.n));
  }
}
