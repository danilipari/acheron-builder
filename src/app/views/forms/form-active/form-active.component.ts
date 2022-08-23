import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationDialog, typeStructure, FormStructure, FormItem } from '../../../shared/interfaces';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { DialogAlertMessagesComponent } from '../../../components/dialog-alert-messages/dialog-alert-messages.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { bounceInRightOnEnterAnimation, bounceInLeftOnEnterAnimation, bounceOutLeftOnLeaveAnimation, bounceOutRightOnLeaveAnimation } from 'angular-animations';
import * as uuid from "uuid";

@Component({
  selector: 'app-form-active',
  templateUrl: './form-active.component.html',
  styleUrls: ['./form-active.component.scss'],
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'enter1', translate: '500px' }),
    bounceInLeftOnEnterAnimation(),
    bounceInRightOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation(),
    bounceOutRightOnLeaveAnimation(),
  ],
})
export class FormActiveComponent implements OnInit {
  public route_id: string = this.route.snapshot.params['id'] !== undefined ? this.route.snapshot.params['id'] : '';

  private _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private _verticalPosition: MatSnackBarVerticalPosition = 'top';

  public formSelected: string = '';

  public type!: any;

  private _items: Array<FormItem> = [
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"text",
      "component":"",
      "enabled":true,
      "name":"text",
      "label":"text",
      "error":"",
      "description":"description",
      "placeholder":"Insert your text",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"email",
      "component":"",
      "enabled":true,
      "name":"email",
      "label":"email",
      "error":"",
      "description":"description",
      "placeholder":"Insert your email",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"password",
      "component":"",
      "enabled":true,
      "name":"password",
      "label":"password",
      "error":"",
      "description":"description",
      "placeholder":"Insert your password",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"date",
      "component":"",
      "enabled":true,
      "name":"date",
      "label":"date",
      "error":"",
      "description":"description",
      "placeholder":"Insert your date",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"datetime-local",
      "component":"",
      "enabled":true,
      "name":"datetime-local",
      "label":"datetime-local",
      "error":"",
      "description":"description",
      "placeholder":"Insert your datetime-local",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"number",
      "component":"",
      "enabled":true,
      "name":"number",
      "label":"number",
      "error":"",
      "description":"description",
      "placeholder":"Insert your number",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"tel",
      "component":"",
      "enabled":true,
      "name":"tel",
      "label":"tel",
      "error":"",
      "description":"description",
      "placeholder":"Insert your tel",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"time",
      "component":"",
      "enabled":true,
      "name":"time",
      "label":"time",
      "error":"",
      "description":"description",
      "placeholder":"Insert your time",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"week",
      "component":"",
      "enabled":true,
      "name":"week",
      "label":"week",
      "error":"",
      "description":"description",
      "placeholder":"Insert your week",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"month",
      "component":"",
      "enabled":true,
      "name":"month",
      "label":"month",
      "error":"",
      "description":"description",
      "placeholder":"Insert your month",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"button",
      "component":"",
      "enabled":true,
      "name":"button",
      "label":"button",
      "error":"",
      "description":"description",
      "placeholder":"Insert your button",
      "options":[
        {
          "optionType": "submit",
          "value": false,
        }
      ],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
  ];

  public types: Array<typeStructure> = [
    {
      uuid: uuid.v4(),
      type: "text",
      label: "text",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "email",
      label: "email",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "password",
      label: "password",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "date",
      label: "date",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "datetime-local",
      label: "datetime-local",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "number",
      label: "number",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "tel",
      label: "tel",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "time",
      label: "time",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "week",
      label: "week",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "month",
      label: "month",
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
      value: null,
    },
  ];

  private _db: any;

  public forms: Array<typeStructure | FormItem> = [
    {
      "index":0,
      "uuid": uuid.v4(),
      "inputType":"text",
      "component":"",
      "enabled":true,
      "name":"text",
      "label":"text",
      "error":"",
      "description":"description",
      "placeholder":"Insert your text",
      "options":[],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    console.log('routeID Workflow', this.route_id);
    this.init();

    if (this.route_id !== '') {
      const xx: any = localStorage.getItem('_local_db_forms');
      this.forms = xx?.length ? JSON.parse(xx).filter((element: any) => element.id === +this.route_id)[0]?.forms : [];
    }
  }

  init(): void {
    this.indexFormRefresh();
    if(localStorage.getItem('_local_db_form')) {
      this._db = localStorage.getItem('_local_db_form');
      this.forms = JSON.parse(this._db);
    } else {
      localStorage.setItem('_local_db_form', JSON.stringify(this.forms));
    }
  }

  dragStart($event: any, type: string, uuid: string, index: number): void {
    this.type = {
      type: type,
      uuid: uuid,
    };
  }

  setFormItem(uuid: string): void {
    if (this.formSelected === '') {
      setTimeout(() => {
        this.formSelected = uuid;
      }, 150);
    } else {
      this.formSelected = uuid;
    }
  }

  getFormItem(uuid: string): any {
    return this.forms.filter((form: any) => form.uuid === uuid)[0];
  }

  rmFromItem(uuid: string): void {
    this.forms = this.forms.filter((form: any) => form.uuid !== uuid);

    if (this.forms.length > 0) {
      localStorage.setItem('_local_db_form', JSON.stringify(this.forms));
    } else {
      this.init();
    }
  }

  public snackBar(message: string = 'Done!', color: string = 'default'): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 2500,
      panelClass: [`snake-${color}`]
    });
  }

  indexFormRefresh(): void {
    this.forms?.forEach((form: any, index: number) => { form.index = index });
  }

  trackByFn(index: number, item: any) {
    return item.uuid;
  }

  drop(event: CdkDragDrop<number[]>) {
    const fromIndex = event.previousIndex;
    const leaveIndex = event.currentIndex;
    if (this.type.type === 'types') {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.forms[leaveIndex] = this._items.filter((item: any) => (item.inputType === this.types[fromIndex].type)).map((el: any) => ({...el, uuid: uuid.v4() }))[0];
      this.indexFormRefresh();

      localStorage.setItem('_local_db_form', JSON.stringify(this.forms));
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.indexFormRefresh();
    }
    this.types = this.types.map((elMap: any) => ({...elMap, uuid: uuid.v4()}));
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
    title: string = 'AlertMessage',
    message: string = 'Confrim?',
    icon: string = 'check-circle-fill',
    action: string = 'save',
    options: any[] = [
      {label: 'No', value: 'no', color: 'danger', action: 'close'},
      {label: 'Yes', value: 'yes', color: 'success', action: 'confirm'}
    ],
  ): void {
    const config: ConfigurationDialog = {
      width: `800px`,
      height: `400px`,
      data: {
        uuid: this.formSelected,
        title: title,
        message: message,
        icon: icon,
        action: action,
        options: options,
      },
    };
    const dialogRef = this.dialog.open(DialogAlertMessagesComponent, config);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result) {
        if( result.type === 'delete' && result?.action?.confirm === true) {
          this.rmFromItem(this.formSelected);
          this.snackBar('Item successfully removed');
          this.formSelected = '';
        } else if (result.type === 'save') {
          this.snackBar();
        }
      }
    });
  }

}
