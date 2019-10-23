import { Component, OnInit } from '@angular/core';
import { EditDistanceAnimator } from './edit-distance-animator';
import { EditDistanceCalculator } from './edit-distance-calculator';

@Component({
  selector: 'app-edit-distance',
  templateUrl: './edit-distance.component.html',
  styleUrls: ['./edit-distance.component.scss']
})
export class EditDistanceComponent implements OnInit {
  animator: EditDistanceAnimator;
  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    const ed = new EditDistanceCalculator();
    console.log(ed.editSequence());

    this.animator = new EditDistanceAnimator(gameCanvas, backgroundCanvas);
    this.animator.startAnimation(ed.editSequence()[0]);
  }
}
