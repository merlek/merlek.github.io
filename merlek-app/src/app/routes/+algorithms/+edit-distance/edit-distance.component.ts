import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditDistanceAnimator } from './edit-distance-animator';
import { EditDistanceCalculator } from './edit-distance-calculator';
import { EditSequenceNode, PathList } from './edit-distance';

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
    const edc = new EditDistanceCalculator(this.src, this.dst);
    this.distance = edc.editDistance();
    this.animator.startAnimation(edc.editSequence());
  }
}
