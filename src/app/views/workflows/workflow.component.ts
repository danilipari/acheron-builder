import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationDialog, Workflow, FormStructure, FormItem, typeStructure } from '../../shared/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRenderComponent } from '../../components/dialog-render/dialog-render.component';
import { WorkflowService } from '../../services/workflow.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as uuid from "uuid";

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public ea_icon: string = 'https://static.escort-advisor.com/favicon.ico';
  public workflows: Array<Workflow> = [];

  constructor(
    public dialog: MatDialog,
    private workflowService: WorkflowService
  ) {}

  ngOnInit(): void {
    this.workflowService.getWorkflows().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.workflows = responseData;
    }, (error) => {
      if (error){
        console.log(error);
      }
    });
  }

  /**
   * @author Dani Lipari
   * @description Function renderDialog
   * @param data: Any
   * @param id: Number | String
   * @visibility Public
   * @returns Void
   */
  public renderDialog(id: number): void {
    const config: ConfigurationDialog = {
      width: `${window.innerWidth  - (window.innerWidth / 2)}px`,
      height: `${window.innerHeight - 150}px`,
      data: {
        title: this.workflows[id]?.title,
        form : this.workflows[id]
      },
    };
    const dialogRef = this.dialog.open(DialogRenderComponent, config);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
