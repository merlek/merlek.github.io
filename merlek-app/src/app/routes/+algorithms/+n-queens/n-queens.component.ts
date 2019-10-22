import { Component, OnInit } from '@angular/core';
import { NQueens } from './n-queens';

@Component({
  selector: 'app-n-queens',
  templateUrl: './n-queens.component.html',
  styleUrls: ['./n-queens.component.scss']
})
export class NQueensComponent implements OnInit {
  algorithm: NQueens;
  constructor() {}
  ngOnInit() {
    const gameCanvas = <HTMLCanvasElement>document.getElementById('game-layer');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );
    this.algorithm = new NQueens(gameCanvas, backgroundCanvas);
  }
}
