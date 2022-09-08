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

  optionsW: AnimationOptions = {
    path: '/assets/lottie/35-compare-solid-edited.json',
  };

  optionsF: AnimationOptions = {
    path: '/assets/lottie/76-newspaper-solid-edited.json',
  };

  optionsL: AnimationOptions = {
    path: '/assets/lottie/40-add-card-solid-edited.json',
  };

  constructor(
    private dashboardService: DashbordService,
  ) {}

  ngOnInit(): void {
    this.dashboardService.getInfo().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.countResurces = responseData;
    }, (error) => {
      if (error){
        console.log(error);
      }
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
