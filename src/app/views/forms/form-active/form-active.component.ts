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
      "component":"input",
      "enabled":true,
      "name":"text",
      "label":"text",
      "error":"",
      "description":"description",
      "placeholder":"Insert your text",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"email",
      "label":"email",
      "error":"",
      "description":"description",
      "placeholder":"Insert your email",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"password",
      "label":"password",
      "error":"",
      "description":"description",
      "placeholder":"Insert your password",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"date",
      "label":"date",
      "error":"",
      "description":"description",
      "placeholder":"Insert your date",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"datetime-local",
      "label":"datetime-local",
      "error":"",
      "description":"description",
      "placeholder":"Insert your datetime-local",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"number",
      "label":"number",
      "error":"",
      "description":"description",
      "placeholder":"Insert your number",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"tel",
      "label":"tel",
      "error":"",
      "description":"description",
      "placeholder":"Insert your tel",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"time",
      "label":"time",
      "error":"",
      "description":"description",
      "placeholder":"Insert your time",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"week",
      "label":"week",
      "error":"",
      "description":"description",
      "placeholder":"Insert your week",
      "childRef": [],
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
      "component":"input",
      "enabled":true,
      "name":"month",
      "label":"month",
      "error":"",
      "description":"description",
      "placeholder":"Insert your month",
      "childRef": [],
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
      "component":"button",
      "enabled":true,
      "name":"button",
      "label":"button",
      "error":"",
      "description":"description",
      "placeholder":"Insert your button",
      "childRef": [],
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
    // Special Forms
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"select",
      "component":"select",
      "enabled":true,
      "name":"select",
      "label":"select",
      "error":"",
      "description":"description",
      "placeholder":"Select your otion",
      "childRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "string",
          "value": "option list item",
        }
      ],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"textarea",
      "component":"textarea",
      "enabled":true,
      "name":"textarea",
      "label":"textarea",
      "error":"",
      "description":"description",
      "placeholder":"Insert your textarea",
      "childRef": [],
      "options":[
        {
          "optionType": "attribute--rows",
          "typeValue": "string",
          "value": "5",
        },
        {
          "optionType": "attribute--cols",
          "typeValue": "string",
          "value": "25",
        }
      ],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"group",
      "component":"group",
      "enabled":true,
      "name":"group",
      "label":"group",
      "error":"",
      "description":"description",
      "placeholder":"Select your otion",
      "childRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "string",
          "value": "group item",
        }
      ],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"checkbox",
      "component":"checkbox",
      "enabled":true,
      "name":"checkbox",
      "label":"checkbox",
      "error":"",
      "description":"description",
      "placeholder":"Select your checkbox",
      "childRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "boolean",
          "value": "false",
        }
      ],
      "required":false,
      "validation":"/.*/",
      "value": "",
      "visible":true,
      "href":""
    },
    {
      "index": null,
      "uuid": uuid.v4(),
      "inputType":"radio",
      "component":"radio",
      "enabled":true,
      "name":"radio",
      "label":"radio",
      "error":"",
      "description":"description",
      "placeholder":"Select your radio",
      "childRef": [],
      "options":[
        {
          "optionType": "option",
          "typeValue": "boolean",
          "value": false,
        },
        {
          "optionType": "option",
          "typeValue": "boolean",
          "value": true,
        },
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
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "email",
      label: "email",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "password",
      label: "password",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "date",
      label: "date",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "datetime-local",
      label: "datetime-local",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "number",
      label: "number",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "tel",
      label: "tel",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "time",
      label: "time",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "week",
      label: "week",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "month",
      label: "month",
      length: 1,
      value: null,
    },
    // Special Forms
    {
      uuid: uuid.v4(),
      type: "select",
      label: "select",
      length: 2,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "textarea",
      label: "textarea",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "group",
      label: "group",
      length: 2,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "checkbox",
      label: "checkbox",
      length: 1,
      value: null,
    },
    {
      uuid: uuid.v4(),
      type: "radio",
      label: "radio",
      length: 2,
      value: null,
    },
  ];

  public typesActions: Array<typeStructure> = [
    {
      uuid: uuid.v4(),
      type: "button",
      label: "button",
      length: 1,
      value: null,
    },
  ];

  public typesFormsFiltered: Array<typeStructure> = [];
  public typesActionsFiltered: Array<typeStructure> = [];

  public specialOptions: Array<string> = [
    'select',
    'group',
    'radio',
  ];

  public filterFormTypesSelected: number = 0;
  public filterActionTypesSelected: number = 0;
  public filterTypes: Array<any> = [
    {
      "label": "All types",
      "value": 0,
    },
    {
      "label": " with single",
      "value": 1,
    },
    {
      "label": " with multiple",
      "value": 2,
    },
  ];

  public hoverForm: boolean = false;
  public hoverAction: boolean = false;

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
    console.debug('routeID Form', this.route_id, this.route_id === '');

    this.typesTypes = Utils.convertObjectToArray(Types);
    this.typesFormsFiltered = [...this.typesForms];
    this.typesActionsFiltered = [...this.typesActions];

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

  private init(): void {
    this.indexRefresh();
  }

  public dragStart($event: any, type: string, uuid: string, index: number): void {
    this.type = {
      type: type,
      uuid: uuid,
    };
    console.debug(this.type, index, uuid, $event, 'type');
  }

  public setSelectedItem(uuid: string, who: string): void {
    if (who === 'form' ? (this.formSelected === '') : (this.actionSelected === '')) {
      setTimeout(() => {
        who === 'form' ? (this.formSelected = uuid, this.actionSelected = '') : (this.actionSelected = uuid, this.formSelected = '');
      }, 150);
    } else {
      who === 'form' ? (this.formSelected = uuid, this.actionSelected = '') : (this.actionSelected = uuid, this.formSelected = '');
    }
  }

  public filterTypesChange(type: string): void {
    if (type === 'form') {
      this.typesFormsFiltered = [...this.typesForms.filter((item: any) => item.length == this.filterFormTypesSelected || this.filterFormTypesSelected == 0)];
    }
    if (type === 'action') {
      this.typesActionsFiltered = [...this.typesActions.filter((item: any) => item.length == this.filterActionTypesSelected || this.filterActionTypesSelected == 0)];
    }
  }

  public isPow(number: number): boolean {
    return Utils.power_of_2(number);
  }

  public getItem(): any {
    const who = {
      type: this.formSelected !== '' ? 'forms' : 'actions',
      uuid: this.formSelected !== '' ? this.formSelected : this.actionSelected,
    };
    const element = this.formBody[who.type].filter((el: any) => el.uuid === who.uuid)[0];
    let clean_element = {...element};
    delete clean_element.id;

    const res = {
      id: (element.id &&  element.id !== null) ? element.id : null,
      full_element: element,
      clean_element: clean_element,
      component: element.component,
      special: this.specialOptions.includes(element.component),
      lengthOptions: element.options.length,
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
    if (this.formBody?.forms.length > 0) {
      this.formBody.forms?.forEach((form: any, index: number) => {
        form.index = index;
      })?.filter((element: any) => element.id !== null);
    }
    if (this.formBody?.actions.length > 0) {
      this.formBody.actions?.forEach((action: any, index: number) => {
        action.index = index;
      })?.filter((element: any) => element.id !== null);
    }
  }

  /**
   * @author Dani Lipari
   * @description Function set unic item in array listener
   * @visibility Public
   * @returns Void
  */
  public trackByFnF(index: number, item: any): void {
    return item?.uuid;
  }

  /**
   * @author Dani Lipari
   * @description Function set unic item in array listener
   * @visibility Public
   * @returns Void
  */
  public trackByFnA(index: number, item: any): void {
    return item?.uuid;
  }

  drop($event: CdkDragDrop<number[]>) {
    const fromIndex = $event.previousIndex;
    const leaveIndex = $event.currentIndex;
    if (this.type.type === 'typesF' || this.type.type === 'typesA') {
      if (this.type.type === 'typesF' && this.hoverForm === true) {
        copyArrayItem(
          this.typesFormsFiltered,
          this.formBody.forms,
          $event.previousIndex,
          $event.currentIndex,
        );
        this.formBody.forms[leaveIndex] = this._items.filter((item: any) => (item.inputType === this.typesFormsFiltered[fromIndex].type)).map((el: any) => ({...el, uuid: uuid.v4() }))[0];
      } else if (this.type.type === 'typesA' && this.hoverAction === true) {
        copyArrayItem(
          this.typesActionsFiltered,
          this.formBody.actions,
          $event.previousIndex,
          $event.currentIndex,
        );
        this.formBody.actions[leaveIndex] = this._items.filter((item: any) => (item.inputType === this.typesActionsFiltered[fromIndex].type)).map((el: any) => ({...el, uuid: uuid.v4() }))[0];
      }
      this.indexRefresh();
    } else {
      moveItemInArray(
        this.formBody.forms,
        $event.previousIndex,
        $event.currentIndex,
      );
      this.indexRefresh();
    }
    this.typesFormsFiltered = this.typesFormsFiltered.map((elMap: any) => ({...elMap, uuid: uuid.v4()}));
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
      component: this.getItem().component,
      special: this.getItem().special,
    };

    const newOption = {
      optionType: who.special ? "option" : "",
      typeValue: Types.string,
      value: ""
    };

    if (index === undefined) {
      this.formBody[who.type] = this.formBody[who.type].map((el: any) => (el.uuid === who.uuid ? {...el, options: [...el.options, newOption]} : {...el}));
    } else {
      this.formBody[who.type].map((el: any) => (el.uuid === who.uuid ? {...el, options: el.options?.length > 0 ? [...el.options?.splice(index, 1)] : []} : {...el}));
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
      console.debug('The dialog was closed', result);
      if (result) {
        if( result.type === 'delete' && result?.action?.confirm === true) {
          this.rmFromItem(this.formSelected);
          this.snackBar('Item successfully removed');
          this.formSelected = '';
        } else if (result.type === 'save-form') {
          if (this.formBody?.form_name?.trim() !== '' && this.formBody?.form_name !== undefined) {
            this.formService.saveForm(this.formBody, this.route_id).pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
              this.snackBar();
            }, (error: any) => {
              this.snackBar(`${error.status} - ${JSON.stringify(error.error)}`);
              console.log(error);
            });
          } else {
            this.snackBar('Form name is required', 'danger');
          }
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
