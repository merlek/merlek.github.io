import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnakeRoutingModule } from './snake-routing.module';
import { SnakeComponent } from './snake.component';

@NgModule({
  declarations: [SnakeComponent],
  imports: [CommonModule, SnakeRoutingModule, FormsModule]
})
export class SnakeModule {}
