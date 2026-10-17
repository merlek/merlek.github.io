import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TowerOfHanoiRoutingModule } from './tower-of-hanoi-routing.module';
import { TowerOfHanoiComponent } from './component/tower-of-hanoi.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TowerOfHanoiComponent],
  imports: [
    CommonModule,
    FormsModule,
    TowerOfHanoiRoutingModule,
    ProgressbarModule
  ]
})
export class TowerOfHanoiModule {}
