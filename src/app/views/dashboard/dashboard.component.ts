import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  countResurces: any = []

  constructor() { }

  ngOnInit() {
    this.countResurces = [
      { "workflows": localStorage.getItem('_local_db_workflows') ? localStorage.getItem('_local_db_workflows') : 0 },
      { "forms": localStorage.getItem('_local_db_forms') ? localStorage.getItem('_local_db_forms') : 0 },
      { "layouts": localStorage.getItem('_local_db_layouts') ? localStorage.getItem('_local_db_layouts') : 0 },
    ];

    this.countResurces = this.countResurces.map((element: string) => (
      { [Object.keys(element)[0]]: JSON.parse(Object.values(element)[0]) }
    ));
  }

}
