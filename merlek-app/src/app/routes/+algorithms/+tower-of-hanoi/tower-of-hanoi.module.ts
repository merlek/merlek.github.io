import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TowerOfHanoiRoutingModule } from './tower-of-hanoi-routing.module';
import { TowerOfHanoiComponent } from './tower-of-hanoi.component';


@NgModule({
  declarations: [TowerOfHanoiComponent],
  imports: [
    CommonModule,
    TowerOfHanoiRoutingModule
  ]
})
export class TowerOfHanoiModule { }
