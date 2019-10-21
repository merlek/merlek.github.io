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
    const canvas3 = <HTMLCanvasElement>(
      document.getElementById('tower-of-hanoi')
    );
    this.algorithm = new TowerOfHanoi(canvas3);
  }
}
