import { Component, OnInit } from '@angular/core';
import { FormStructure, FormItem } from '././../../shared/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  _db!: any;
  forms: Array<FormStructure> = [];
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

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if(localStorage.getItem('_local_db_forms')) {
      this._db = localStorage.getItem('_local_db_forms');
      this.forms = JSON.parse(this._db);
    } else {
      this.forms = [this.form_default];
      localStorage.setItem('_local_db_forms', JSON.stringify(this.forms));
    }
  }

  sumListLength(array: Array<any>): number {
    return array.map((element: any[]) => (element.length)).reduce((a, b) => a + b, 0);
  }

}
