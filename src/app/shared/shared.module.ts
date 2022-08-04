import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { RouterModule } from '@angular/router';
import { JsonRenderComponent } from './json-render/json-render.component';


const components: Array<any> = [
  SidebarComponent,
  JsonRenderComponent
];

@NgModule({
  declarations: [
    components,
    JsonRenderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxJsonViewerModule
  ],
  exports: [
    components,
  ],
})
export class SharedModule {}
