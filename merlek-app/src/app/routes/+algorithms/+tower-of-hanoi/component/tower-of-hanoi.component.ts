import { Component, OnInit, OnDestroy } from '@angular/core';
import { TowerOfHanoiAnimationBuilder } from '../tower-of-hanoi-animation-builder';
import { TowerOfHanoiAnimator } from '../tower-of-hanoi-animator';

@Component({
  selector: 'app-tower-of-hanoi',
  templateUrl: './tower-of-hanoi.component.html',
  styleUrls: ['./tower-of-hanoi.component.scss']
})
export class TowerOfHanoiComponent implements OnInit, OnDestroy {
  n = 5;
  animator: TowerOfHanoiAnimator;
  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );
    this.animator = new TowerOfHanoiAnimator(gameCanvas, backgroundCanvas);
    this.animator.startAnimation(
      TowerOfHanoiAnimationBuilder.getAnimation(this.n)
    );
  }

  ngOnDestroy(): void {
    this.animator.destroy();
  }

  reset() {
    this.animator.startAnimation(
      TowerOfHanoiAnimationBuilder.getAnimation(this.n)
    );
  }
}
