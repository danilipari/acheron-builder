import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialog, Workflow, FormStructure } from '../../shared/interfaces';
import * as uuid from "uuid";

@Component({
  selector: 'app-dialog-render',
  templateUrl: './dialog-render.component.html',
  styleUrls: ['./dialog-render.component.scss']
})
export class DialogRenderComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogRenderComponent>,
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

}
