import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from './../../services/form.service';
import { FormStructure, FormItem, CloneFormUUIDStructure } from '././../../shared/interfaces';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Utils from '../../shared/utils';
import * as uuid from "uuid";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  forms!: any;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  ea_icon: string = 'https://static.escort-advisor.com/favicon.ico';

  show_right_click: boolean = false;
  show_left_click: boolean = false;
  hover_left_click: boolean = false;
  use_left: boolean = false;
  show_menu_click_id: number | null = 0;

  private _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private _verticalPosition: MatSnackBarVerticalPosition = 'top';

  clientY: number = 0;
  clientX: number = 0;

  form_default = {
    id: 0,
    form_name: 'Form test',
    form_text: 'default_text',
    form_special: true,
    forms: [],
    actions: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  statusJsonImport: boolean = false;

  constructor(
    private formService: FormService,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  public  ngOnInit(): void {
    this.formService.getForms().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.forms = responseData;
    }), (error: any) => {
      console.log(error);
    }
  }

  public updateJsonImport(element: any): void {
    this.statusJsonImport = element;
  }

  public snackBar(message: string = 'Done!', color: string = 'default'): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 2500,
      panelClass: [`snake-${color}`]
    });
  }

  public async onRightClick(event: any, form: FormItem): Promise<void> {
    await event.preventDefault();
    await this.openMenu(event, form, 'right');
  }

  public openMenu(event: any, form: FormItem, where: string = 'left'): void {
    // console.debug(event, 'openmenu', where, form.form_id);
    if (where === "right") {
      (this.show_menu_click_id == 0 || this.show_menu_click_id == form.form_id) && (this.show_right_click = !this.show_right_click);
      if (this.show_right_click) {
        this.show_left_click && (this.show_left_click = !this.show_left_click);
        this.clientY = event["layerY"];
        this.clientX = event["layerX"];
      } else {
        this.clientY = 0;
        this.clientX = 0;
      }
    } else {
      (this.show_menu_click_id == form.form_id) && (this.show_left_click = !this.show_left_click);
      this.clientY = 0;
      this.clientX = 0;
      this.use_left = true;
      setTimeout(() => {
        this.use_left = false;
      }, 200);
    }
    this.show_menu_click_id = Number(form.form_id);
  }

  public closeMenu(): void {
    if (!this.hover_left_click && !this.show_right_click) {
      this.show_left_click = !this.show_left_click;
    } else {
      !this.use_left && (this.show_right_click = !this.show_right_click);
    }
  }

  private cloneForm(form: FormItem): { nf: FormItem, uuidS: Array<CloneFormUUIDStructure> } {
    let newForm: any = structuredClone(form);
    let uuidS: Array<CloneFormUUIDStructure> = [];
    let arrL: any[] = new Array(newForm.forms_quantity *2).fill({ uuid: "", uuidRef: "" }).map(() => ({ uuid: uuid.v4(), uuidRef: uuid.v4() }));

    for (let key of Object.entries(newForm)) {
      // console.debug(key[0], key[1]);
      switch (key[0]) {
        case "uuid":
          // newForm["_uuid"] = key[1];
          newForm[key[0]] = uuid.v4();
          break;
        case "forms":
          newForm[key[0]] = ([key[1]]).flat().map((f: any, index: number) => (
            uuidS.push({
              _uuid: f.uuid,
              uuid: arrL[0].uuid,
              _uuidRef: f.uuidRef,
              uuidRef: arrL[0].uuidRef
            }),
            {
              ...f,
              uuid: uuidS.reverse()[0].uuid,
              uuidRef: uuidS.reverse()[0].uuidRef
            }
          ));
          break;
        case "actions":
          newForm[key[0]] = ([key[1]]).flat().map((f: any) => (
            uuidS.push({
              _uuid: f.uuid,
              uuid: arrL[0].uuid,
              _uuidRef: f.uuidRef,
              uuidRef: arrL[0].uuidRef
            }),
            {
              ...f,
              uuid: uuidS.reverse()[0].uuid,
              uuidRef: uuidS.reverse()[0].uuidRef
            }
          ));
          break;
        default:
          break;
      }
    }

    for (let key of Object.entries(newForm)) {
      // console.debug(key[0], key[1]);
      switch (key[0]) {
        case "forms":
          newForm[key[0]] = ([key[1]]).flat().map((f: any, index: number) => (
            {
              ...f,
              color: Utils.stringToColour(`${f.inputType} - ${f.uuidRef}`),
              childrenRef: [...f.childrenRef].map((cR: any) => ({
                ...cR,
                color: Utils.stringToColour(`${cR.inputType} - ${uuidS.find((u: any) => u._uuidRef === cR.uuidRef)!.uuidRef}`),
                uuid: uuidS.find((u: any) => u._uuid === cR.uuid)!.uuid,
                uuidRef: uuidS.find((u: any) => u._uuidRef === cR.uuidRef)!.uuidRef
              })),
            }
          ));
          break;
        case "actions":
          newForm[key[0]] = ([key[1]]).flat().map((f: any) => (
            {
              ...f,
              color: Utils.stringToColour(`${f.inputType} - ${f.uuidRef}`),
              childrenRef: [...f.childrenRef].map((cR: any) => ({
                ...cR,
                color: Utils.stringToColour(`${cR.inputType} - ${uuidS.find((u: any) => u._uuidRef === cR.uuidRef)!.uuidRef}`),
                uuid: uuidS.find((u: any) => u._uuid === cR.uuid)!.uuid,
                uuidRef: uuidS.find((u: any) => u._uuidRef === cR.uuidRef)!.uuidRef,
              })),
            }
          ));
          break;
        case "form_name":
          newForm[key[0]] = `${key[1]} - COPY`;
          break;
        case "form_text":
          newForm[key[0]] = `${key[1]} - COPY`;
          break;
        default:
          break;
      }
    }

    return { nf: newForm, uuidS: uuidS };
  }

  public cloneFormAction(form: FormItem) {
    // console.debug(`clone form ${form.form_id}`, form, this.cloneForm(form).nf);
    /* this.ngOnInit(); */

    const data = this.cloneForm(form).nf;
    this.formService.saveForm(data).subscribe((res: any) => {
      console.debug("cloneFormAction", res);
      this.snackBar('Form cloned successfully');
      this.ngOnInit();
    }), (err: any) => {
      console.error(err);
    };
  }

  sumListLength(array: Array<any>): number {
    return array.map((element: any[]) => (element.length)).reduce((a, b) => a + b, 0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
// https://register.sandbox.game
