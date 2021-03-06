import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditDistanceAnimator } from '../edit-distance-animator';
import { EditDistanceCalculator } from '../edit-distance-calculator';

@Component({
  selector: 'app-edit-distance',
  templateUrl: './edit-distance.component.html',
  styleUrls: ['./edit-distance.component.scss']
})
export class EditDistanceComponent implements OnInit, OnDestroy {
  animator: EditDistanceAnimator;
  src: string;
  dst: string;

  distance: number;

  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    this.animator = new EditDistanceAnimator(gameCanvas, backgroundCanvas);
    this.reset();
  }
  ngOnDestroy(): void {
    this.animator.destroy();
  }
  reset() {
    const edc = new EditDistanceCalculator(
      this.src || 'ALGORITHM',
      this.dst || 'ALTRUISTIC'
    );
    this.distance = edc.editDistance();
    this.animator.startAnimation(edc.editSequence());
  }
}
