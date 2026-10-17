import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NQueensRoutingModule } from './n-queens-routing.module';
import { NQueensComponent } from './component/n-queens.component';

@NgModule({
  declarations: [NQueensComponent],
  imports: [
    CommonModule,
    FormsModule,
    NQueensRoutingModule,
    ProgressbarModule
  ]
})
export class NQueensModule {}
