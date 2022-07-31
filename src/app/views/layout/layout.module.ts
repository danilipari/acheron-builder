import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';
import { LayoutActionComponent } from './layout-action/layout-action.component';

const components: Array<any> = [
  LayoutComponent,
  LayoutActionComponent,
];


@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    LayoutRoutingModule,
  ],
  exports: [
    components,
  ],
})
export class LayoutModule { }
