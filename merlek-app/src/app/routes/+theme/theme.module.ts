import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [ThemeComponent],
  imports: [CommonModule, ThemeRoutingModule]
})
export class ThemeModule {}
