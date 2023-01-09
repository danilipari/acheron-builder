import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { WorkflowActionComponent } from './workflow-action/workflow-action.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
  },
  {
    path: 'action',
    component: WorkflowActionComponent,
  },
  {
    path: 'action/:id',
    component: WorkflowActionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
