import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDistanceComponent } from './component/edit-distance.component';

const routes: Routes = [{ path: '', component: EditDistanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDistanceRoutingModule {}
