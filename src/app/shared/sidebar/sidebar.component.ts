import { Component, OnInit, Input } from '@angular/core';
import { SidebarRoutes } from '../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public version: any;

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
