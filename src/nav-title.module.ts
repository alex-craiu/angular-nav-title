import { NgModule } from '@angular/core';
import { NavTitleComponent } from './nav-title.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NavTitleComponent],
  exports: [NavTitleComponent],
  imports: [CommonModule]
})
export class NavTitleModule { }
