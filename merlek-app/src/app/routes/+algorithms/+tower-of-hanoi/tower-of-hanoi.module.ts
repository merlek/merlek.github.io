import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap';
import { TowerOfHanoiRoutingModule } from './tower-of-hanoi-routing.module';
import { TowerOfHanoiComponent } from './tower-of-hanoi.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TowerOfHanoiComponent],
  imports: [
    CommonModule,
    FormsModule,
    TowerOfHanoiRoutingModule,
    ProgressbarModule.forRoot()
  ]
})
export class TowerOfHanoiModule {}
