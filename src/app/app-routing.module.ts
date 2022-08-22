import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workflows',
    pathMatch: 'full'
  },
  {
    path: 'workflows',
    loadChildren: () => import('./views/workflows/workflow.module').then((m) => m.WorkflowModule),
    canActivate: [],
  },
  {
    path: 'layouts',
    loadChildren: () => import('./views/layouts/layout.module').then((m) => m.LayoutModule),
    canActivate: [],
  },
  {
    path: 'forms',
    loadChildren: () => import('./views/forms/form.module').then((m) => m.FormModule),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
