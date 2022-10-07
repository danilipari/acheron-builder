import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from './../../services/form.service';
import { FormStructure, FormItem } from '././../../shared/interfaces';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  constructor(
    private formService: FormService,
    public router: Router,
  ) {}

  public  ngOnInit(): void {
    this.formService.getForms().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.forms = responseData;
    }), (error: any) => {
      console.log(error);
    }
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

  // function that copy form with interface FormItem and change the value of keys equal to "uuid" with new "uuid.v4()"
  private cloneForm(form: FormItem): FormItem {
    let newForm: any = structuredClone(form);

    for (let key of Object.entries(newForm)) {
      console.debug(key[0], key[1]);
      switch (key[0]) {
        case "uuid":
          newForm["_uuid"] = key[1];
          newForm[key[0]] = uuid.v4();
          break;
        case "forms":
          newForm[key[0]] = ([key[1]]).flat().map((f: any) => ({
            ...f,
            _uuid: f.uuid,
            uuid: uuid.v4(),
            _uuidRef: f.uuidRef,
            uuidRef: uuid.v4()
          }));
          break;
        case "actions":
          newForm[key[0]] = ([key[1]]).flat().map((f: any) => ({
            ...f,
            _uuid: f.uuid,
            uuid: uuid.v4(),
            _uuidRef: f.uuidRef,
            uuidRef: uuid.v4()
          }));
          break;
        default:
          break;
      }
    }

    return newForm;
  }

  public cloneFormAction(form: FormItem) {
    console.debug(`clone form ${form.form_id}`, form, this.cloneForm(form));
    /* this.ngOnInit(); */
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
