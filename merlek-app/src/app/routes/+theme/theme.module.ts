import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [ThemeComponent],
  imports: [CommonModule, BootRoutingModule]
})
export class ThemeModule {}
