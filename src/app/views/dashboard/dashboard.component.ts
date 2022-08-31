import { Component, OnInit, OnDestroy } from '@angular/core';
import { resInfo } from 'src/app/shared/interfaces';
import { DashbordService } from 'src/app/services/dashbord.service';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  countResurces!: resInfo;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

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

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
