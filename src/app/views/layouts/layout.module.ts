import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';
import { LayoutActionComponent } from './layout-action/layout-action.component';

const components: Array<any> = [LayoutComponent, LayoutActionComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    LayoutRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    DragDropModule,
    MatSnackBarModule,
    SharedModule,
    MatTooltipModule,
    MatButtonModule,
    NgxJsonViewerModule,
  ],
  exports: [components],
})
export class LayoutModule {}
