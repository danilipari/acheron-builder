import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SidebarRoutes } from '../interfaces';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
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
  @Input() public width: number = 250;

  side: any;

  dashboardIcon = this.convertLottieUrl("157-swipe-solid-edited.json");

  routes: Array<SidebarRoutes> = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: this.convertLottieUrl("41-home-solid-edited.json"),
      visible: true,
    },
    {
      name: "Workflows",
      path: "/workflows",
      icon: this.convertLottieUrl("35-compare-solid-edited.json"),
      visible: true,
    },
    {
      name: "Forms",
      path: "/forms",
      icon: this.convertLottieUrl("76-newspaper-solid-edited.json"),
      visible: true,
    },
    {
      name: "Layouts",
      path: "/layouts",
      icon: this.convertLottieUrl("40-add-card-solid-edited.json"),
      visible: true,
    },
  ];

  constructor(
    private dashbordService: DashbordService
  ) { }

  ngOnInit(): void {
    this.dashbordService.sidebarObs.pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: boolean) => {
      this.side = responseData;
    });
  }

  public toggleSidebar(): void {
    this.side = !this.side;
    this.dashbordService.sidebar.next(this.side);
  }

  animationCreated(animationItem: AnimationItem): void {
    console.debug(animationItem);
  }

  public convertLottieUrl(url: string): AnimationOptions {
    const svg: AnimationOptions = {
      path: `/assets/lottie/${url}`,
    };

    return svg;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
