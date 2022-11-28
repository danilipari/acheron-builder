import { StrapiBabylon2Component } from './strapi-babylon2.component';
import { StrapiCategoriesComponent } from './strapi-categories/strapi-categories.component';
import { StrapiCountriesComponent } from './strapi-countries/strapi-countries.component';
import { StrapiLabelsComponent } from './strapi-labels/strapi-labels.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StrapiBabylon2Component,
  },
  {
    path: 'categories',
    component: StrapiCategoriesComponent,
  },
  {
    path: 'countries',
    component: StrapiCountriesComponent,
  },
  {
    path: 'labels',
    component: StrapiLabelsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class   StrapiBabylon2RoutingModule { }
