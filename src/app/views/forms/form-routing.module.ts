import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form.component';
import { FormActiveComponent } from './form-active/form-active.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  },
  {
    path: 'action',
    component: FormActiveComponent,
  },
  {
    path: 'action/:id',
    component: FormActiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
