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
      name: "Workflows",
      path: "/workflows",
      visible: true,
    },
    {
      name: "Forms",
      path: "/forms",
      visible: true,
    },
    {
      name: "Layouts",
      path: "/layouts",
      visible: true,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    /*  */
  }

}
