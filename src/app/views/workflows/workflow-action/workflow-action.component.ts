import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';
import { FormService } from '../../../services/form.service';
import { LayoutService } from '../../../services/layout.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Workflow } from '../../../shared/interfaces';
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
  public workflow: Workflow = {
    uuid: uuid.v4(),
    title: '',
    created_at: null,
    forms: [],
    layout_id: 0,
  };
  public forms: any = {
    forms: [],
    special: [],
    regular: [],
  };
  public layouts!: any[];

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private layoutService: LayoutService,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    console.log('routeID Workflow', this.route_id, this.route_id === '');

    forkJoin({
      forms: this.formService.getForms(),
      /* layouts: this.layoutService.getLayouts(), */
    }).subscribe((res: any) => {
      const _forms = res.forms?.map((f: any) => ({ ...f, form_special: Boolean(Number(f.form_special)) }));
      this.forms = {
        forms: _forms,
        special: _forms.filter((f: any) => f.form_special === true),
        regular: _forms.filter((f: any) => f.form_special === false),
      }
      /* this.layouts = res.layouts; */
      this.layouts = [
        { id: 1, layout_name: 'Default' },
        { id: 2, layout_name: 'Altro layout' }
      ];
      console.log('forms', this.forms);
    });

    if (this.route_id !== '') {
      this.workflowService.getWorkflow(this.route_id).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
          this.workflow = {
            ...res,
            layout_id: Number(res.layout_id),
            online_from: this.fixBackISOString(res.online_from),
            online_to: this.fixBackISOString(res.online_to),
          };
        }), (error: any) => {
        console.log(error);
      };
    }
  }

  public dateChange(event: any, who: any): void {
    const date: Date = new Date(event.target.value);
    if (who === 'online_from') {
      this.workflow.online_from = date.toISOString();
    } else if (who === 'online_to') {
      this.workflow.online_to = date.toISOString();
    }
  }

  public formSelected(): any {
    if (this.workflow && this.workflow.forms) {
      return {
        forms: [...this.forms.forms.filter((f: any) => this.workflow.forms.includes(f.id))],
        error_form: [...this.forms.forms.filter((f: any) => this.workflow.error_form == f.id)],
        unavailable_form: [...this.forms.forms.filter((f: any) => this.workflow.unavailable_form == f.id)],
      };
    }
  }

  public fixBackISOString(stringDate: string): string {
    const stringT = stringDate.split(' ');
    return `${stringT[0]}T${stringT[1]}Z`;
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

  public saveWorkflow(): void {
    if (this.route_id === '') {
      this.workflowService.saveWorkflow(this.workflow).subscribe((resS: any) => {
        console.log(resS, this.route_id);
      });
    } else {
      this.workflowService.saveWorkflow(this.workflow, this.route_id).subscribe((resE: any) => {
        console.log(resE, this.route_id);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
