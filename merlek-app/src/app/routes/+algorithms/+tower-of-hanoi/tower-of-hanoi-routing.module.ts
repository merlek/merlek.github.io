import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowerOfHanoiComponent } from './tower-of-hanoi.component';

const routes: Routes = [{ path: '', component: TowerOfHanoiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TowerOfHanoiRoutingModule { }
