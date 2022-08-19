import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workflow',
    pathMatch: 'full'
  },
  {
    path: 'workflow',
    loadChildren: () => import('./views/workflow/workflow.module').then((m) => m.WorkflowModule),
    canActivate: [],
  },
  {
    path: 'layout',
    loadChildren: () => import('./views/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [],
  },
  {
    path: 'form',
    loadChildren: () => import('./views/form/form.module').then((m) => m.FormModule),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
