import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subject, pipe, of, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ConfigurationDialog,
  TypeStructure,
  FormStructure,
  FormItem,
  Types,
} from '../../../shared/interfaces';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
  CdkDrag,
} from '@angular/cdk/drag-drop';
import { DialogAlertMessagesComponent } from '../../../components/dialog-alert-messages/dialog-alert-messages.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormService } from '../../../services/form.service';
import { StrapiBabylon2Service } from '../../../services/strapi-babylon2.service';
import {
  bounceInRightOnEnterAnimation,
  bounceInLeftOnEnterAnimation,
  bounceOutLeftOnLeaveAnimation,
  bounceOutRightOnLeaveAnimation,
  bounceInAnimation,
} from 'angular-animations';
import Utils from '../../../shared/utils';
import Constants from '../../../shared/constants';
import * as uuid from 'uuid';

@Component({
  selector: 'app-form-active',
  templateUrl: './form-active.component.html',
  styleUrls: ['./form-active.component.scss'],
  animations: [
    bounceInRightOnEnterAnimation({ anchor: 'enter1', translate: '500px' }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter2', translate: '500px' }),
    bounceInRightOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation(),
    bounceOutRightOnLeaveAnimation({ anchor: 'enter2', translate: '500px' }),
  ],
})
export class FormActiveComponent implements OnInit, OnDestroy {
  public testing: boolean = false;
  public route_id: string =
    this.route.snapshot.params['id'] !== undefined
      ? this.route.snapshot.params['id']
      : '';
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  private _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private _verticalPosition: MatSnackBarVerticalPosition = 'top';

  public formSelected: string = '';
  public actionSelected: string = '';

  public typesTypes: any;

  public type!: any;

  public crColor: string = '';

  private _items: Array<FormItem> = Constants._itemsFormItem;

  public allFormItemsMapped: Array<FormItem> = [];
  public allFormItemsMappedFiltered: Array<FormItem> = [];

  public typesForms: Array<TypeStructure> = Constants.typesFormsTypeStructure;

  public typesActions: Array<TypeStructure> =
    Constants.typesActionsTypeStructure;

  public typesFormsFiltered: Array<TypeStructure> = [];
  public typesActionsFiltered: Array<TypeStructure> = [];

  public specialOptions: Array<string> = [
    'externalwidget',
    'select',
    'group',
    'radio',
    'label',
  ];

  public specialOptionsLength: Array<string> = ['externalwidget'];

  public filterFormTypesSelected: number = 0;
  public filterActionTypesSelected: number = 0;
  public filterTypes: Array<any> = [
    {
      label: 'All types',
      value: 0,
    },
    {
      label: ' with single',
      value: 1,
    },
    {
      label: ' with multiple',
      value: 2,
    },
  ];

  externalJSON: boolean = false;

  public regexs: any[] = [
    {
      label: 'Password 5 Level Strenght Password',
      regex:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!#%*?&]{8,}$',
    },
  ];

  public strapi = {
    countries: Constants.strapiCountries,
    languages: Constants.strapiLanguages,
  };

  public hoverForm: boolean = false;
  public hoverAction: boolean = false;

  public formBody: any = {
    uuid: uuid.v4(),
    form_name: '',
    form_special: false,
    forms: [],
    actions: [],
  };

  htmlContent = '';
  config = Constants.angularEditorConfig;

  jsonFile: any;
  fileInfo: any;
  hidden: boolean = false;

  limit: number = 1_000_000_000;
  skip: number = 0;
  totalLength: number = 0;
  labels: any[] = [];

  typesF: any;
  typesA: any;
  forms: any;
  actions: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public formService: FormService,
    private strapiService: StrapiBabylon2Service
  ) {}

  ngOnInit(): void {
    localStorage.getItem('-t-s-')
      ? (this.testing = true)
      : (this.testing = false);
    console.debug('routeID Form', this.route_id, this.route_id !== '');

    /* this.strapiService.getTableCollectionItems("application::label.label", this.skip, this.limit, "label_title", "ASC").pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      console.log('--responseData labels--', responseData.results);
    }, (error: any) => {
      console.log(error);
    }); */

    this.typesTypes = Utils.convertObjectToArray(Types);
    this.typesFormsFiltered = [...this.typesForms];
    this.typesActionsFiltered = [...this.typesActions];

    if (this.route_id !== '') {
      this.formService
        .getForm(this.route_id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: any) => {
          this.formBody = {
            ...res,
            form_special: Boolean(Number(res.form_special)),
            actions: res.actions ? res.actions : [],
            forms: res.forms ? res.forms : [],
          };

          this.init();
        }),
        (error: any) => {
          console.log(error);
        };
    } else {
      if (Object.keys(history.state).length > 2) {
        this.formBody = {
          ...history.state,
          form_special: Boolean(Number(history.state.form_special)),
          actions: history.state.actions ? history.state.actions : [],
          forms: history.state.forms ? history.state.forms : [],
        };
      }
      this.init();
    }
  }

  private init(): void {
    this.indexRefresh();
    this.setChips();

    this.jsonFile = this.formBody;
    this.fileInfo = {
      name: `form-${
        this.route_id !== '' ? this.formBody.uuid : this.formBody.uuid + '-new'
      }.json`,
    };
  }

  public dragStart(
    $event: any,
    type: string,
    uuid: string,
    index: number
  ): void {
    this.type = {
      type: type,
      uuid: uuid,
    };
    console.debug(this.type, index, uuid, $event, 'type');
  }

  public setSelectedItem(uuid: string, who: string): void {
    if (
      who === 'form' ? this.formSelected === '' : this.actionSelected === ''
    ) {
      setTimeout(() => {
        who === 'form'
          ? ((this.formSelected = uuid), (this.actionSelected = ''))
          : ((this.actionSelected = uuid), (this.formSelected = ''));
        this.init();
      }, 150);
    } else {
      who === 'form'
        ? ((this.formSelected = uuid), (this.actionSelected = ''))
        : ((this.actionSelected = uuid), (this.formSelected = ''));
      this.init();
    }
  }

  public filterTypesChange(type: string): void {
    if (type === 'form') {
      this.typesFormsFiltered = [
        ...this.typesForms.filter(
          (item: any) =>
            item.length == this.filterFormTypesSelected ||
            this.filterFormTypesSelected == 0
        ),
      ];
    }
    if (type === 'action') {
      this.typesActionsFiltered = [
        ...this.typesActions.filter(
          (item: any) =>
            item.length == this.filterActionTypesSelected ||
            this.filterActionTypesSelected == 0
        ),
      ];
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
    const element = this.formBody[who.type].find(
      (el: any) => el.uuid === who.uuid
    );
    let clean_element = { ...element };
    delete clean_element.id;

    const res = {
      id: element.id && element.id !== null ? element.id : null,
      full_element: element,
      clean_element: clean_element,
      component: element.component,
      special: this.specialOptions.includes(element.component),
      specialOptions: this.specialOptions.includes(element.component),
      lengthOptions: element.options.length,
      childrenRef: element.childrenRef,
    };
    return res;
  }

  /**
   * @author Dani Lipari
   * @description this function remove item from formBody.forms field
   * @param {String} uuid
   * @visibility Private
   * @returns Void
   */
  private rmFromItem(uuid: string, who: string): void {
    this.formBody[who] = this.formBody[who].filter(
      (who: any) => who.uuid !== uuid
    );
    this.init();
  }

  public snackBar(message: string = 'Done!', color: string = 'default'): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 2500,
      panelClass: [`snake-${color}`],
    });
  }

  private setChips(): void {
    const who = {
      type: this.formSelected !== '' ? 'forms' : 'actions',
      uuid: this.formSelected !== '' ? this.formSelected : this.actionSelected,
    };

    this.allFormItemsMapped = [
      ...this.formBody.forms?.map((elF: any) => ({
        id: elF.id,
        uuid: elF.uuid,
        uuidRef: elF.uuidRef,
        inputType: elF.inputType,
        color: Utils.stringToColour(`${elF.inputType} - ${elF?.uuidRef}`),
      })),
      ...this.formBody.actions?.map((elA: any) => ({
        id: elA.id,
        uuid: elA.uuid,
        uuidRef: elA.uuidRef,
        inputType: elA.inputType,
        color: Utils.stringToColour(`${elA.inputType} - ${elA?.uuidRef}`),
      })),
    ];

    this.allFormItemsMappedFiltered = [
      ...this.allFormItemsMapped?.filter((self: any) => self.uuid !== who.uuid),
    ];
  }

  public mapChildrenRefList(
    allFormItemsMappedFiltered: Array<object>
  ): Array<any> {
    const who = {
      childrenRef: this.getItem().childrenRef,
    };

    const finalArr = [
      ...allFormItemsMappedFiltered.reduce((acc: any, item: any) => {
        if (
          who.childrenRef.map((elC: any) => elC.uuidRef).includes(item.uuidRef)
        ) {
          acc = [
            ...acc,
            who.childrenRef.filter((el: any) => el.uuidRef === item.uuidRef)[0],
          ];
        } else {
          acc = [...acc, item];
        }
        return acc;
      }, []),
    ];
    return finalArr;
  }

  public chipRemove(element: any): void {
    const who = {
      type: this.formSelected !== '' ? 'forms' : 'actions',
      uuid: this.formSelected !== '' ? this.formSelected : this.actionSelected,
      component: this.getItem().component,
      special: this.getItem().special,
      childrenRef: this.getItem().childrenRef,
    };

    const childrenRefMapped = [
      ...who.childrenRef.filter((elR: any) => elR.uuid !== element.uuid),
    ];

    this.formBody[who.type] = this.formBody[who.type].map((el: any) =>
      el.uuid === who.uuid
        ? { ...el, childrenRef: childrenRefMapped }
        : { ...el }
    );
  }

  public addChildrenRef(element: any): void {
    const who = {
      type: this.formSelected !== '' ? 'forms' : 'actions',
      uuid: this.formSelected !== '' ? this.formSelected : this.actionSelected,
      component: this.getItem().component,
      special: this.getItem().special,
      childrenRef: this.getItem().childrenRef,
    };

    console.debug('addChildrenRef', element);
    if (
      who.childrenRef.map((el: any) => el.uuidRef).includes(element.uuidRef)
    ) {
      this.formBody[who.type] = this.formBody[who.type].map((el: any) =>
        el.uuid === who.uuid
          ? {
              ...el,
              childrenRef: who.childrenRef.filter(
                (ell: any) => ell.uuidRef !== element.uuidRef
              ),
            }
          : { ...el }
      );
    } else {
      this.formBody[who.type] = this.formBody[who.type].map((el: any) =>
        el.uuid === who.uuid
          ? { ...el, childrenRef: [...who.childrenRef, element] }
          : { ...el }
      );
    }
  }

  /**
   * @author Dani Lipari
   * @description Function order index of array
   * @visibility Private
   * @returns Void
   */
  private indexRefresh(): void {
    if (this.formBody?.forms.length > 0) {
      this.formBody.forms
        ?.forEach((form: any, index: number) => {
          form.index = index;
          form.color = Utils.stringToColour(
            `${form.inputType} - ${form.uuidRef}`
          );
        })
        ?.filter((element: any) => element.id !== null);
    }
    if (this.formBody?.actions.length > 0) {
      this.formBody.actions
        ?.forEach((action: any, index: number) => {
          action.index = index;
          action.color = Utils.stringToColour(
            `${action.inputType} - ${action.uuidRef}`
          );
        })
        ?.filter((element: any) => element.id !== null);
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

  /* drop($event: CdkDragDrop<number[]>) { */
  drop($event: CdkDragDrop<TypeStructure[], any, any>) {
    const fromIndex = $event.previousIndex;
    const leaveIndex = $event.currentIndex;
    if (this.type.type === 'typesF' || this.type.type === 'typesA') {
      if (this.type.type === 'typesF' && this.hoverForm === true) {
        copyArrayItem(
          this.typesFormsFiltered,
          this.formBody.forms,
          $event.previousIndex,
          $event.currentIndex
        );
        this.formBody.forms[leaveIndex] = this._items
          .filter(
            (item: any) =>
              item.inputType === this.typesFormsFiltered[fromIndex].type
          )
          .map((el: any) => ({
            ...el,
            uuid: uuid.v4(),
            uuidRef: uuid.v4(),
          }))[0];
      } else if (this.type.type === 'typesA' && this.hoverAction === true) {
        copyArrayItem(
          this.typesActionsFiltered,
          this.formBody.actions,
          $event.previousIndex,
          $event.currentIndex
        );
        this.formBody.actions[leaveIndex] = this._items
          .filter(
            (item: any) =>
              item.inputType === this.typesActionsFiltered[fromIndex].type
          )
          .map((el: any) => ({
            ...el,
            uuid: uuid.v4(),
            uuidRef: uuid.v4(),
          }))[0];
      }
      this.init();
    } else {
      moveItemInArray(
        this.formBody.forms,
        $event.previousIndex,
        $event.currentIndex
      );
      this.init();
    }
    this.typesFormsFiltered = this.typesFormsFiltered.map((elMap: any) => ({
      ...elMap,
      uuid: uuid.v4(),
    }));
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
      optionType: who.special ? 'option' : '',
      typeValue: Types.string,
      value: '',
    };

    if (index === undefined) {
      this.formBody[who.type] = this.formBody[who.type].map((el: any) =>
        el.uuid === who.uuid
          ? { ...el, options: [...el.options, newOption] }
          : { ...el }
      );
    } else {
      this.formBody[who.type].map((el: any) =>
        el.uuid === who.uuid
          ? {
              ...el,
              options:
                el.options?.length > 0 ? [...el.options?.splice(index, 1)] : [],
            }
          : { ...el }
      );
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
      { label: 'No', value: 'no', color: 'danger', action: 'close' },
      { label: 'Yes', value: 'yes', color: 'success', action: 'confirm' },
    ]
  ): void {
    const config: ConfigurationDialog = {
      width: `800px`,
      height: `400px`,
      data: {
        uuid:
          this.formSelected !== '' ? this.formSelected : this.actionSelected,
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
        if (result.type === 'delete' && result?.action?.confirm === true) {
          this.rmFromItem(
            this.formSelected !== '' ? this.formSelected : this.actionSelected,
            this.formSelected !== '' ? 'forms' : 'actions'
          );
          this.snackBar('Item successfully removed');
          this.formSelected !== ''
            ? (this.formSelected = '')
            : (this.actionSelected = '');
        } else if (result.type === 'save-form') {
          if (
            this.formBody?.form_name?.trim() !== '' &&
            this.formBody?.form_name !== undefined
          ) {
            this.formService
              .saveForm(this.formBody, this.route_id)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((responseData: any) => {
                this.snackBar('Form successfully created!');
                // this.router.navigate(['/forms']);
              }),
              (error: any) => {
                this.snackBar(
                  `${error.status} - ${JSON.stringify(error.error)}`
                );
                console.log(error);
              };
          } else {
            this.snackBar('Form name is required', 'danger');
          }
        } else if (result.type === 'save-field') {
          const form_id = this.route_id;
          const form_detail_id = this.getItem().id;
          const data = {
            form: {
              ...this.getItem().full_element,
            },
          };

          this.formService
            .saveFormField(form_id, form_detail_id, data)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((responseData: any) => {
              this.snackBar('Field successfully updated!');
            }),
            (error: any) => {
              this.snackBar(`${error.status} - ${JSON.stringify(error.error)}`);
              console.log(error);
            };
        } else if (result.type === 'delete-form') {
          console.debug('delete', this.route_id);
          this.formService
            .deleteForm(this.route_id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response: any) => {
              this.snackBar('Form successfully deleted!');
              this.router.navigate(['/forms']);
            }),
            (error: any) => {
              this.snackBar(`${error.status} - ${JSON.stringify(error.error)}`);
              console.log(error);
            };
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
