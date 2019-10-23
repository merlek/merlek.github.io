import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-distance',
  templateUrl: './edit-distance.component.html',
  styleUrls: ['./edit-distance.component.scss']
})
export class EditDistanceComponent implements OnInit {
  algorithm: EditDistance.EditDistanceCalculator;
  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    this.algorithm = new EditDistance.EditDistanceCalculator();
  }
}
