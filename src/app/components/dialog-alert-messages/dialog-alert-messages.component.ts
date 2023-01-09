import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfigurationDialog } from '../../shared/interfaces';

@Component({
  selector: 'app-dialog-alert-messages',
  templateUrl: './dialog-alert-messages.component.html',
  styleUrls: ['./dialog-alert-messages.component.scss'],
})
export class DialogAlertMessagesComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogAlertMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigurationDialog | any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    /*  */
  }

  onNoClick(): void {
    const output: any = {
      close: true,
    };
    this.dialogRef.close(output);
  }

  onSaveClick(): void {
    const output: any = {
      type: this.data.action,
      action: {
        confirm: true,
      },
    };
    this.dialogRef.close(output);
  }
}
