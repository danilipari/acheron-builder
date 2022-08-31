import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { bounceInRightOnEnterAnimation, bounceInLeftOnEnterAnimation, bounceOutLeftOnLeaveAnimation, bounceOutRightOnLeaveAnimation } from 'angular-animations';
import * as uuid from "uuid";

@Component({
  selector: 'app-workflow-action',
  templateUrl: './workflow-action.component.html',
  styleUrls: ['./workflow-action.component.scss'],
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'enter1', translate: '500px' }),
    bounceInLeftOnEnterAnimation(),
    bounceInRightOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation(),
    bounceOutRightOnLeaveAnimation(),
  ],
})
export class WorkflowActionComponent implements OnInit {
  public route_id: string = this.route.snapshot.params['id'] !== undefined ? this.route.snapshot.params['id'] : '';
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
  ) {}

  ngOnInit(): void {
    console.log('routeID Workflow', this.route_id, this.route_id === '');

    if (this.route_id !== '') {
      this.workflowService.getWorkflow(this.route_id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: any) => {
          console.log('getWorkflow', res);
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
