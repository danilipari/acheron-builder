import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialog } from '../../shared/interfaces';

@Component({
  selector: 'app-dialog-alert-messages',
  templateUrl: './dialog-alert-messages.component.html',
  styleUrls: ['./dialog-alert-messages.component.scss']
})
export class DialogAlertMessagesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAlertMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigurationDialog | any,
  ) {}

  ngOnInit(): void {
    /*  */
  }

  onNoClick(): void {
    const output: any = {
      "close": true
    };
    this.dialogRef.close(output);
  }

  onSaveClick(): void {
    const output: any = {
      "action": {
        "confirm": true,
      }
    };
    this.dialogRef.close(output);
  }

}
