import { Component, OnInit } from '@angular/core';
import { TowerOfHanoi } from './tower-of-hanoi';

@Component({
  selector: 'app-tower-of-hanoi',
  templateUrl: './tower-of-hanoi.component.html',
  styleUrls: ['./tower-of-hanoi.component.scss']
})
export class TowerOfHanoiComponent implements OnInit {
  algorithm: TowerOfHanoi;
  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );
    this.algorithm = new TowerOfHanoi(gameCanvas, backgroundCanvas);
  }
}
