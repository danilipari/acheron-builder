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
  show_right_click_id: number | null = 0;
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

  ngOnInit(): void {
    this.formService.getForms().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.forms = responseData;
    }), (error: any) => {
      console.log(error);
    }
  }

  public onRightClick(event: any, form: FormStructure): void {
    event.preventDefault();
    this.show_right_click = !this.show_right_click;
    this.show_right_click_id = Number(form.id);

    if (this.show_right_click) {
      this.clientY = event["layerY"];
      this.clientX = event["layerX"];
      // console.log('right click', event, this.show_right_click, this.show_right_click_id );
    } else {
      this.clientY = 0;
      this.clientX = 0;
    }
  }

  sumListLength(array: Array<any>): number {
    return array.map((element: any[]) => (element.length)).reduce((a, b) => a + b, 0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
