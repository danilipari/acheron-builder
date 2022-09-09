import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { FormActiveComponent } from './form-active/form-active.component';


/*  */
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../../shared/shared.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

/*  */


@NgModule({
  declarations: [
    FormComponent,
    FormActiveComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    MatSnackBarModule,
    SharedModule,
    MatTooltipModule,
    MatChipsModule,
    MatSelectModule,
    NgxJsonViewerModule,
  ]
})
export class FormModule { }
