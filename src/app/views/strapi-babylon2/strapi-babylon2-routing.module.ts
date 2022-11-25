import { StrapiBabylon2Component } from './strapi-babylon2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StrapiBabylon2Component,
  },
  /* {
    path: 'action',
    component: LayoutActionComponent,
  },
  {
    path: 'action/:id',
    component: LayoutActionComponent,
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class   StrapiBabylon2RoutingModule { }
