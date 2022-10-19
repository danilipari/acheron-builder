import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../../../services/workflow.service';
import { FormService } from '../../../services/form.service';
import { LayoutService } from '../../../services/layout.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Workflow } from '../../../shared/interfaces';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { bounceInRightOnEnterAnimation, bounceInLeftOnEnterAnimation, bounceOutLeftOnLeaveAnimation, bounceOutRightOnLeaveAnimation } from 'angular-animations';
import * as uuid from "uuid";
import 'leader-line';
declare let LeaderLine: any;


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

  llArr: any[] = [];
  htmlBody: string = ``;
  lines: any[] = [];

  private _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private _verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private layoutService: LayoutService,
    private formService: FormService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    console.debug('routeID Workflow', this.route_id, this.route_id === '');

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
      console.debug('forms', this.forms);
    });

    if (this.route_id !== '') {
      this.workflowService.getWorkflow(this.route_id).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
        this.workflow = {
          ...res,
          layout_id: Number(res.layout_id),
          online_from: res.online_from ? this.fixBackISOString(res.online_from) : '',
          online_to: res.online_to ? this.fixBackISOString(res.online_to) : '',
        };
      }), (error: any) => {
        console.log(error);
      };
    }

    this.updateFlowUI();
  }

  public dateChange(event: any, who: any): void {
    const date: Date = new Date(event.target.value);
    if (who === 'online_from') {
      this.workflow.online_from = date.toISOString();
    } else if (who === 'online_to') {
      this.workflow.online_to = date.toISOString();
    }
  }

  private generateHtmlFlow(arr: any = this.formSelected().forms): any {
    let html = `<div class="my-5 p-5 d-flex flex-row justify-content-between">`;
    arr.forEach((fS: any, ix: number) => {
      html += `
        <div id="${fS.uuid}" class="px-3">
          <div class="p-2 border border-primary rounded">
            ${fS.form_name}
          </div>
        </div>`;
      });
      html += "<div>";
    return html;
  }

  private async updateHtmlBody(): Promise<void> {
    const html = await this.generateHtmlFlow();
    return this.htmlBody = html;
  }

  private updateFlowUI(): any {
    if (this.formSelected().forms.length > 1) {
      this.lines.forEach((l: any) => l.remove());
      this.lines = [];

      if (this.lines.length === 0) {
        this.llArr = this.formSelected().forms.reduce((acc: Array<any>, item: any, index: number) => {
          if (index > 0) {
            acc = [...acc, [this.formSelected().forms[index -1], this.formSelected().forms[index]]];
          }
          return acc;
        }, []);

        this.updateHtmlBody();

        setTimeout(() => {
          [...this.llArr].forEach((f: any, ix: number) => {
            if (f.length === 2) {
              const elementLine = new LeaderLine(
                document.getElementById(`${f[0].uuid}`),
                document.getElementById(`${f[1].uuid}`), {
                  startPlugColor: '#712cf9',
                  endPlugColor: '#2E2C48',
                  gradient: true,
                }
              );
              this.lines = [...this.lines, elementLine];
            }
          });
        }, 5);
      }
    }
  }

  public formSelected(): any {
    if (this.workflow && this.workflow.forms) {
      return {
        forms: [...this.forms.forms.filter((f: any) => this.workflow.forms.includes(f.form_id))],
        error_form: [...this.forms.forms.filter((f: any) => this.workflow.error_form == f.form_id)],
        unavailable_form: [...this.forms.forms.filter((f: any) => this.workflow.unavailable_form == f.form_id)],
      };
    }
  }

  public fixBackISOString(stringDate: string): string {
    const stringT = stringDate?.split(' ');
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

  public snackBar(message: string = 'Done!', color: string = 'default'): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 2500,
      panelClass: [`snake-${color}`]
    });
  }

  public saveWorkflow(): void {
    if (this.route_id === '') {
      this.workflowService.saveWorkflow(this.workflow).subscribe((resS: any) => {
        console.debug(resS, this.route_id);
        this.router.navigate(['/workflows']);
        this.snackBar('Workflow successfully created!');
      }), (error: any) => {
        this.snackBar(`${error.status} - ${JSON.stringify(error.error)}`);
        console.log(error);
      };
    } else {
      this.workflowService.saveWorkflow(this.workflow, this.route_id).subscribe((resE: any) => {
        console.debug(resE, this.route_id);
        this.snackBar('Workflow successfully updated!');
      }), (error: any) => {
        this.snackBar(`${error.status} - ${JSON.stringify(error.error)}`);
        console.log(error);
      };
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
