import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../../shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';


import { WorkflowComponent } from './workflow.component';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowActionComponent } from './workflow-action/workflow-action.component';
import { MatTooltipModule } from '@angular/material/tooltip';


const components: Array<any> = [
  WorkflowComponent,
  WorkflowActionComponent,
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    MatSnackBarModule,
    SharedModule,
    MatTooltipModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgxJsonViewerModule,
    WorkflowRoutingModule,
  ],
  exports: [
    components
  ]
})
export class WorkflowModule {}
