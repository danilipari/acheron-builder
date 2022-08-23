import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  _db!: any;
  forms: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if(localStorage.getItem('_local_db_forms')) {
      this._db = localStorage.getItem('_local_db_forms');
      this.forms = JSON.parse(this._db);
    } else {
      localStorage.setItem('_local_db_forms', JSON.stringify(this.forms));
    }
  }

}
