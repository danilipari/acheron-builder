import { Component, OnInit, Input } from '@angular/core';
import { SidebarRoutes } from '../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public version: string = "";
  @Input() public title: string = "";

  routes: Array<SidebarRoutes> = [
    {
      name: "Workflow",
      path: "/workflow",
      visible: true,
    },
    {
      name: "Form",
      path: "/form",
      visible: true,
    },
    {
      name: "Layout",
      path: "/layout",
      visible: true,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    /*  */
  }

}
