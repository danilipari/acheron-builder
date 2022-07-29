import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule { }
