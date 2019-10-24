import { Component, OnInit } from '@angular/core';
import { EditDistanceAnimator } from './edit-distance-animator';
import { EditDistanceCalculator } from './edit-distance-calculator';
import { EditSequenceNode, PathList } from './edit-distance';

@Component({
  selector: 'app-edit-distance',
  templateUrl: './edit-distance.component.html',
  styleUrls: ['./edit-distance.component.scss']
})
export class EditDistanceComponent implements OnInit {
  animator: EditDistanceAnimator;

  src: string;
  dst: string;

  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    this.animator = new EditDistanceAnimator(gameCanvas, backgroundCanvas);
    this.animator.startAnimation(
      new EditDistanceCalculator().editSequence()[0]
    );
  }

  reset() {
    this.animator.startAnimation(
      new EditDistanceCalculator(this.src, this.dst).editSequence()[0]
    );
  }
}
