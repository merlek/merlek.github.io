import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap';
import { NQueensRoutingModule } from './n-queens-routing.module';
import { NQueensComponent } from './n-queens.component';

@NgModule({
  declarations: [NQueensComponent],
  imports: [
    CommonModule,
    FormsModule,
    NQueensRoutingModule,
    ProgressbarModule.forRoot()
  ]
})
export class NQueensModule {}
