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


import { BuilderComponent } from './builder.component';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderActionComponent } from './builder-action/builder-action.component';

const components: Array<any> = [
  BuilderComponent,
  BuilderActionComponent,
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
    NgxBootstrapIconsModule.pick(allIcons),
    NgxJsonViewerModule,
    BuilderRoutingModule,
  ],
  exports: [
    components
  ]
})
export class BuilderModule {}
