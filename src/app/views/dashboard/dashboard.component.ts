import { Component, OnInit, OnDestroy } from '@angular/core';
import { resInfo } from 'src/app/shared/interfaces';
import { DashbordService } from 'src/app/services/dashbord.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  countResurces!: resInfo;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  optionsW: AnimationOptions = this.convertLottieUrl("35-compare-solid-edited.json");
  optionsF: AnimationOptions = this.convertLottieUrl("76-newspaper-solid-edited.json");
  optionsL: AnimationOptions = this.convertLottieUrl("40-add-card-solid-edited.json");

  constructor(
    private dashboardService: DashbordService,
  ) {}

  ngOnInit(): void {
    this.dashboardService.getInfo().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.countResurces = responseData;
    }), (error: any) => {
      console.log(error);
    };
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
