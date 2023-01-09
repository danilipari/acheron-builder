import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../../shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { WorkflowComponent } from './workflow.component';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowActionComponent } from './workflow-action/workflow-action.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const components: Array<any> = [WorkflowComponent, WorkflowActionComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    MatSnackBarModule,
    SharedModule,
    MatTooltipModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgxJsonViewerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    WorkflowRoutingModule,
  ],
  exports: [components],
})
export class WorkflowModule {}
