import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';
import { FormService } from '../../../services/form.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormStructure } from '../../../shared/interfaces';
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
  public workflow!: FormStructure;
  public forms!: any;

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    console.log('routeID Workflow', this.route_id, this.route_id === '');

    forkJoin({
      forms: this.formService.getForms(),
    }).subscribe(res => {
      this.forms = res.forms;
      console.log(res, 'RES')
    });

    if (this.route_id !== '') {
      this.workflowService.getWorkflow(this.route_id).pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: any) => {
          this.workflow = res;
        }), (error: any) => {
        console.log(error);
      };
    }
  }

  /**
   * @author Dani Lipari
   * @description Function generate UUID
   * @visibility Public
   * @returns Void
  */
  public generateUUID(): void {
    this.workflow.uuid = uuid.v4();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
