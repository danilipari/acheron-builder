import { Component, OnInit } from '@angular/core';
import { SidebarRoutes } from '../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  version: string = '1.0.0';

  routes: Array<SidebarRoutes> = [
    {
      name: "Builder",
      path: "/builder",
      active: true,
    },
    {
      name: "Layout",
      path: "/layout",
      active: false,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
