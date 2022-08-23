import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  _db!: any;
  layouts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if(localStorage.getItem('_local_db_layouts')) {
      this._db = localStorage.getItem('_local_db_layouts');
      this.layouts = JSON.parse(this._db);
    } else {
      localStorage.setItem('_local_db_layouts', JSON.stringify(this.layouts));
    }
  }

}
