import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.formService.getForms().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.forms = responseData;
    }), (error: any) => {
      console.log(error);
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
