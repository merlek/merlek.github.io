import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NQueensComponent } from './component/n-queens.component';

const routes: Routes = [{ path: '', component: NQueensComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NQueensRoutingModule {}
