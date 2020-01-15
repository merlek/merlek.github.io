import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TicTacToeManager } from '../animation/tic-tac-toe-manager';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy {
  animator: TicTacToeManager;
  constructor() {}

  ngOnInit() {
    this.scaleCanvas();

    this.animator = new TicTacToeManager(
      <HTMLCanvasElement>document.getElementById('game-layer'),
      <HTMLCanvasElement>document.getElementById('background-layer'),
      <HTMLCanvasElement>document.getElementById('ui-layer')
    );

    // window.addEventListener('keydown', e => {
    //   if (this.animator.keyEvent(e.key)) {
    //     e.preventDefault();
    //   }
    // });

    this.animator.start();
  }
  ngOnDestroy(): void {
    this.animator.ngOnDestroy();
  }

  @HostListener('window:resize', ['$event'])
  scaleCanvas(event?: Event) {
    const menu = document.getElementById('menu');
    const main = document.getElementById('main');
    const stage = <HTMLCanvasElement>document.getElementById('stage');
    const backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById('background-layer')
    );

    // const scaleX = window.innerWidth / backgroundCanvas.width;
    const scaleY =
      (window.innerHeight - menu.offsetHeight - 10) / backgroundCanvas.height;
    const scaleX = main.offsetWidth / backgroundCanvas.width;
    // const scaleY = main.offsetHeight / backgroundCanvas.height;

    const scaleToFit = Math.min(scaleX, scaleY);
    const scaleToCover = Math.max(scaleX, scaleY);

    stage.style.transformOrigin = '0 0'; // scale from top left
    stage.style.transform = 'scale(' + scaleToFit + ')';
  }
}
