import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'builder',
    pathMatch: 'full'
  },
  {
    path: 'builder',
    loadChildren: () => import('./views/builder/builder.module').then((m) => m.BuilderModule),
    canActivate: [],
  },
  {
    path: 'layout',
    loadChildren: () => import('./views/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
