import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap';
import { TowerOfHanoiRoutingModule } from './tower-of-hanoi-routing.module';
import { TowerOfHanoiComponent } from './tower-of-hanoi.component';

@NgModule({
  declarations: [TowerOfHanoiComponent],
  imports: [
    CommonModule,
    TowerOfHanoiRoutingModule,
    ProgressbarModule.forRoot()
  ]
})
export class TowerOfHanoiModule {}
