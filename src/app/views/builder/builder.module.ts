import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BuilderComponent } from './builder.component';
import { BuilderRoutingModule } from './builder-routing.module';


@NgModule({
  declarations: [
    BuilderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BuilderRoutingModule,
  ]
})
export class BuilderModule {}
