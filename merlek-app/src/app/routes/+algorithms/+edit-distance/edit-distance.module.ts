import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDistanceRoutingModule } from './edit-distance-routing.module';
import { EditDistanceComponent } from './edit-distance.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [EditDistanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditDistanceRoutingModule,
    ProgressbarModule.forRoot()
  ]
})
export class EditDistanceModule {}
