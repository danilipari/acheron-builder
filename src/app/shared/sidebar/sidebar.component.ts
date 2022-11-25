import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SidebarRoutes } from '../interfaces';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DashbordService } from 'src/app/services/dashbord.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  @Input() public version: string = "";
  @Input() public title: string = "";
  @Input() public min_title: string = "";

  side: any;

  dashboardIcon = "157-swipe-solid-edited.json";

  routes: Array<SidebarRoutes> = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "41-home-solid-edited.json",
      visible: true,
    },
    {
      name: "Strapi",
      path: "/strapi",
      icon: "19-book-solid-edited.json",
      visible: true,
    },
    {
      name: "Workflows",
      path: "/workflows",
      icon: "35-compare-solid-edited.json",
      visible: true,
    },
    {
      name: "Forms",
      path: "/forms",
      icon: "76-newspaper-solid-edited.json",
      visible: true,
    },
    {
      name: "Layouts",
      path: "/layouts",
      icon: "40-add-card-solid-edited.json",
      visible: true,
    },
  ];

  constructor(
    private dashbordService: DashbordService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('sid')) {
      const sid = localStorage.getItem('sid') ?? "";
      this.side = JSON.parse(sid);
    } else {
      this.dashbordService.sidebarObs.pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: boolean) => {
        this.side = responseData;
        localStorage.setItem('sid', JSON.stringify(this.side));
      });
    }
  }

  public toggleSidebar(): void {
    this.side = !this.side;
    this.dashbordService.sidebar.next(this.side);
    localStorage.setItem('sid', this.side);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
