import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialog, Workflow, FormStructure } from '../../shared/interfaces';
import { DialogAlertMessagesComponent } from '../dialog-alert-messages/dialog-alert-messages.component';
import * as uuid from "uuid";

@Component({
  selector: 'app-dialog-render',
  templateUrl: './dialog-render.component.html',
  styleUrls: ['./dialog-render.component.scss']
})
export class DialogRenderComponent implements OnInit {
  private deleteId!: number | string;

  constructor(
    private dialogRef: MatDialogRef<DialogRenderComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ConfigurationDialog | any,
  ) {
    dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    /*  */
  }

  public renderJsonWorkflow(data: Workflow): any {
    const res = {
      ...data
    };
    return res;
  }

  onClose(id?: number | string): void {
    const output: any = {
      close: true,
      id: id,
    };
    this.dialogRef.close(output);
  }

  onDelete(id: number | string): void {
    this.deleteId = id;
    this.dialogAlertMessage();
  }

  onDeleteConfirm(): void {
    const output: any = {
      close: false,
      delete: true,
      id: this.deleteId,
    };
    this.dialogRef.close(output);
  }

  /**
   * @author Dani Lipari
   * @description Function open DialogAlertMessage
   * @param {String} title
   * @param {String} message
   * @param {String} icon
   * @param {Array} action
   * @param {String} options
   * @visibility Public
   * @returns Void
  */
  public dialogAlertMessage(
    title: string = 'Delete Workflow',
    message: string = 'Are you sure you want to delete this workflow?',
    icon: string = 'check-circle-fill',
    action: string = 'delete',
    options: any[] = [
      {label: 'No', value: 'no', color: 'danger', action: 'close'},
      {label: 'Yes', value: 'yes', color: 'success', action: 'confirm'}
    ],
  ): void {
    const config: ConfigurationDialog = {
      width: `800px`,
      height: `400px`,
      data: {
        uuid: uuid.v4(),
        title: title,
        message: message,
        icon: icon,
        action: action,
        options: options,
      },
    };
    const dialogRef = this.dialog.open(DialogAlertMessagesComponent, config);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.debug('The dialog was closed', result);
      if (result) {
        if (result.action?.confirm && result.type === 'delete') {
          this.onDeleteConfirm();
        }
      }
    });
  }

}
