import { StrapiBabylon2Component } from './strapi-babylon2.component';
import { StrapiCategoriesComponent } from './strapi-categories/strapi-categories.component';
import { StrapiCountriesComponent } from './strapi-countries/strapi-countries.component';
import { StrapiLabelsComponent } from './strapi-labels/strapi-labels.component';
import { StrapiLabelsDetailComponent } from './strapi-labels-detail/strapi-labels-detail.component';
import { StrapiCategoriesDetailComponent } from './strapi-categories-detail/strapi-categories-detail.component';
import { StrapiCountriesDetailComponent } from './strapi-countries-detail/strapi-countries-detail.component';


import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StrapiBabylon2Component,
    canActivate: [],
  },
  {
    path: 'categories',
    component: StrapiCategoriesComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => localStorage.getItem("jwtStrap") ? true : false,
    ],
  },
  {
    path: 'categories/detail/',
    component: StrapiCategoriesDetailComponent,
    data: {
      title: "Add Category",
      breadcrumb: "Add Category"
    }
  },
  {
    path: 'categories/detail/:id',
    component: StrapiCategoriesDetailComponent,
    data: {
      title: "Edit Category",
      breadcrumb: "Edit Category"
    }
  },
  /*  */
  {
    path: 'countries',
    component: StrapiCountriesComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => localStorage.getItem("jwtStrap") ? true : false,
    ],
  },
  {
    path: 'countries/detail/',
    component: StrapiCountriesDetailComponent,
    data: {
      title: "Add Country",
      breadcrumb: "Add Country"
    }
  },
  {
    path: 'countries/detail/:id',
    component: StrapiCountriesDetailComponent,
    data: {
      title: "Edit Country",
      breadcrumb: "Edit Country"
    }
  },
  /*  */
  {
    path: 'labels',
    component: StrapiLabelsComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => localStorage.getItem("jwtStrap") ? true : false,
    ],
  },
  {
    path: 'labels/detail/',
    component: StrapiLabelsDetailComponent,
    data: {
      title: "Add Label",
      breadcrumb: "Add Label"
    }
  },
  {
    path: 'labels/detail/:id',
    component: StrapiLabelsDetailComponent,
    data: {
      title: "Edit Label",
      breadcrumb: "Edit Label"
    }
  },
  /*  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class   StrapiBabylon2RoutingModule { }
