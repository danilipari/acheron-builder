import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { BuilderActionComponent } from './builder-action/builder-action.component';

const routes: Routes = [
  {
    path: '',
    component: BuilderComponent
  },
  {
    path: 'action',
    component: BuilderActionComponent
  },
  {
    path: 'action/:id',
    component: BuilderActionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule {}
