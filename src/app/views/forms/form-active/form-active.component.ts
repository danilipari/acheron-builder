import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationDialog, typeStructure, FormStructure, FormItem, Types } from '../../../shared/interfaces';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { DialogAlertMessagesComponent } from '../../../components/dialog-alert-messages/dialog-alert-messages.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../../../services/form.service';
import { bounceInRightOnEnterAnimation, bounceInLeftOnEnterAnimation, bounceOutLeftOnLeaveAnimation, bounceOutRightOnLeaveAnimation } from 'angular-animations';
import Utils from '../../../shared/utils';
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
export class FormActiveComponent implements OnInit, OnDestroy {
  public route_id: string = this.route.snapshot.params['id'] !== undefined ? this.route.snapshot.params['id'] : '';
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  private _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private _verticalPosition: MatSnackBarVerticalPosition = 'top';

  public formSelected: string = '';
  public actionSelected: string = '';

  public typesTypes: any;

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
          "typeValue": "boolean",
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

  public typesForms: Array<typeStructure> = [
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
  ];

  public typesActions: Array<typeStructure> = [
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
      value: null,
    },
  ];

  public formBody: any = {
    uuid: uuid.v4(),
    form_special: false,
    forms: [],
    actions: [],
  };

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public formService: FormService,
  ) {}

  ngOnInit(): void {
    console.log('routeID Form', this.route_id, this.route_id === '');

    this.typesTypes = Utils.convertObjectToArray(Types);

    if (this.route_id !== '') {
      this.formService.getForm(this.route_id).pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: any) => {
          this.formBody = {
            ...res,
            form_special: Boolean(Number(res.form_special)),
          };
        }), (error: any) => {
        console.log(error);
      };
    }
    this.init();
  }

  init(): void {
    this.indexRefresh();
  }

  dragStart($event: any, type: string, uuid: string, index: number): void {
    this.type = {
      type: type,
      uuid: uuid,
    };
  }

  setSelectedItem(uuid: string, who: string): void {
    if (who === 'form' ? (this.formSelected === '') : (this.actionSelected === '')) {
      setTimeout(() => {
        who === 'form' ? (this.formSelected = uuid, this.actionSelected = '') : (this.actionSelected = uuid, this.formSelected = '');
      }, 150);
    } else {
      who === 'form' ? (this.formSelected = uuid, this.actionSelected = '') : (this.actionSelected = uuid, this.formSelected = '');
    }
  }

  getItem(): any {
    const who = {
      type: this.formSelected !== '' ? 'forms' : 'actions',
      uuid: this.formSelected !== '' ? this.formSelected : this.actionSelected,
    };
    const element = this.formBody[who.type].filter((el: any) => el.uuid === who.uuid)[0];
    let clean_element = {...element};
    delete clean_element.id;

    const res = {
      id: element.id !== null ? element.id : null,
      full_element: element,
      clean_element: clean_element,
    }
    return res;
  }

  /**
   * @author Dani Lipari
   * @description this function remove item from formBody.forms field
   * @param {String} uuid
   * @visibility Private
   * @returns Void
   */
  private rmFromItem(uuid: string): void {
    this.formBody.forms = this.formBody.forms.filter((form: any) => form.uuid !== uuid);
    this.init();
  }

  public snackBar(message: string = 'Done!', color: string = 'default'): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 2500,
      panelClass: [`snake-${color}`]
    });
  }

  /**
   * @author Dani Lipari
   * @description Function order index of array
   * @visibility Private
   * @returns Void
  */
  private indexRefresh(): void {
    if (this.formBody?.forms.length > 0 || this.formBody?.actions.length > 0) {
      this.formBody.forms?.forEach((form: any, index: number) => {
        form.index = index;
      });
      this.formBody.actions?.forEach((action: any, index: number) => {
        action.index = index;
      });
    }
  }

  /**
   * @author Dani Lipari
   * @description Function set unic item in array listener
   * @visibility Public
   * @returns Void
  */
  public trackByFn(index: number, item: any): void {
    return item.uuid;
  }

  drop($event: CdkDragDrop<number[]>) {
    const fromIndex = $event.previousIndex;
    const leaveIndex = $event.currentIndex;
    if (this.type.type === 'typesF' || this.type.type === 'typesA') {
      if (this.type.type === 'typesF') {
        copyArrayItem(
          this.typesForms,
          this.formBody.forms,
          $event.previousIndex,
          $event.currentIndex,
        );

        this.formBody.forms[leaveIndex] = this._items.filter((item: any) => (item.inputType === this.typesForms[fromIndex].type)).map((el: any) => ({...el, uuid: uuid.v4() }))[0];
        this.indexRefresh();
      } else if (this.type.type === 'typesA') {
        copyArrayItem(
          this.typesActions,
          this.formBody.actions,
          $event.previousIndex,
          $event.currentIndex,
        );
        this.formBody.actions[leaveIndex] = this._items.filter((item: any) => (item.inputType === this.typesActions[fromIndex].type)).map((el: any) => ({...el, uuid: uuid.v4() }))[0];
        this.indexRefresh();
      }
    } else {
      moveItemInArray(
        // $event.container.data, --> generic
        this.formBody.forms,
        $event.previousIndex,
        $event.currentIndex,
      );
      this.indexRefresh();
    }
    this.typesForms = this.typesForms.map((elMap: any) => ({...elMap, uuid: uuid.v4()}));
  }

  /**
   * @author Dani Lipari
   * @description Function generate UUID
   * @visibility Public
   * @returns Void
  */
  public generateUUID(who: string): void {
    if (who === 'formBody.uuid') {
      this.formBody.uuid = uuid.v4();
    }
  }

  public optionActions(index?: number): void {
    const who = {
      type: this.formSelected !== '' ? 'forms' : 'actions',
      uuid: this.formSelected !== '' ? this.formSelected : this.actionSelected,
    };

    const newOption = {
      optionType: "",
      typeValue: Types.string,
      value: ""
    };

    /* console.log(
      index,
      who,
      "addOption",
      this.getItem().full_element,
      this.formBody[who.type],
      this.formBody[who.type].map((el: any) => (el.uuid === who.uuid ? {...el, options: [...el.options, newOption]} : {...el})),
    ); */

    if (index === undefined) {
      this.formBody[who.type] = this.formBody[who.type].map((el: any) => (el.uuid === who.uuid ? {...el, options: [...el.options, newOption]} : {...el}));
    } else {
      this.formBody[who.type].map((el: any) => (el.uuid === who.uuid ? {...el, options: el.options?.length > 0 ? [...el.options?.splice(index, 1)] : []} : {...el}))
    }
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
        } else if (result.type === 'save-form') {
          this.formService.saveForm(this.formBody, this.route_id).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
            this.snackBar();
          }, (error: any) => {
            console.log(error);
          });
        } else if (result.type === 'save-field') {
          const form_id = this.route_id;
          const form_detail_id = this.getItem().id;
          const data = {
            "form": {
              ...this.getItem().full_element
            }
          };

          this.formService.saveFormField(form_id, form_detail_id, data).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
            this.snackBar('Field successfully saved');
          }, (error: any) => {
            console.log(error);
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
