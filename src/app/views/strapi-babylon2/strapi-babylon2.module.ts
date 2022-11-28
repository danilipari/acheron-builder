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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


import { StrapiBabylon2RoutingModule } from './strapi-babylon2-routing.module';

import { StrapiBabylon2Component } from './strapi-babylon2.component';
import { StrapiCategoriesComponent } from './strapi-categories/strapi-categories.component';
import { StrapiCountriesComponent } from './strapi-countries/strapi-countries.component';
import { StrapiLabelsComponent } from './strapi-labels/strapi-labels.component';
import { StrapiUsersComponent } from './strapi-users/strapi-users.component';

const components: Array<any> = [
  StrapiBabylon2Component,
  StrapiCategoriesComponent,
  StrapiCountriesComponent,
  StrapiLabelsComponent,
  StrapiUsersComponent,
];


@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    StrapiBabylon2RoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    DragDropModule,
    MatSnackBarModule,
    SharedModule,
    MatTooltipModule,
    MatButtonModule,
    NgxJsonViewerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    components,
  ],
})
export class StrapiBabylon2Module { }
