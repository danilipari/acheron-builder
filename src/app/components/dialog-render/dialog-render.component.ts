import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationDialog } from '../../shared/interfaces';

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

  onNoClick(): void {
    const output: any = {
      close: true
    };
    this.dialogRef.close(output);
  }

}
