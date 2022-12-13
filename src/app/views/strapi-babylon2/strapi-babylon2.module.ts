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
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';


import { StrapiBabylon2RoutingModule } from './strapi-babylon2-routing.module';

import { StrapiBabylon2Component } from './strapi-babylon2.component';
import { StrapiCategoriesComponent } from './strapi-categories/strapi-categories.component';
import { StrapiCountriesComponent } from './strapi-countries/strapi-countries.component';
import { StrapiLabelsComponent } from './strapi-labels/strapi-labels.component';
import { StrapiLabelsDetailComponent } from './strapi-labels-detail/strapi-labels-detail.component';
import { StrapiCategoriesDetailComponent } from './strapi-categories-detail/strapi-categories-detail.component';
import { StrapiCountriesDetailComponent } from './strapi-countries-detail/strapi-countries-detail.component';

import { StrapiHeaderComponent } from './components/strapi-header/strapi-header.component';
import { StrapiDynamicSelectComponent } from './components/strapi-dynamic-select/strapi-dynamic-select.component';

const components: Array<any> = [
  StrapiBabylon2Component,
  StrapiCategoriesComponent,
  StrapiCountriesComponent,
  StrapiLabelsComponent,
  StrapiLabelsDetailComponent,
  StrapiCategoriesDetailComponent,
  StrapiCountriesDetailComponent,

  StrapiHeaderComponent,
  StrapiDynamicSelectComponent,
];

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
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
    ...materialModules,
    MatSelectModule,
  ],
  exports: [
    components,
  ],
})
export class StrapiBabylon2Module { }
