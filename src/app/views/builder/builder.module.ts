import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    BuilderRoutingModule,
  ],
  exports: [
    components
  ]
})
export class BuilderModule {}
