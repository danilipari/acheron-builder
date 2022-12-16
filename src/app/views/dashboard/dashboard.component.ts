import { Component, OnInit, OnDestroy } from '@angular/core';
import { resInfo } from 'src/app/shared/interfaces';
import { DashbordService } from 'src/app/services/dashbord.service';
import { forkJoin, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  countResurces!: resInfo;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  optionsW: string = "35-compare-solid-edited.json";
  optionsF: string = "76-newspaper-solid-edited.json";
  optionsL: string = "40-add-card-solid-edited.json";
  optionsS: string = "19-book-solid-edited.json";

  constructor(
    private dashboardService: DashbordService,
  ) {}

  ngOnInit(): void {
    this.dashboardService.getInfo().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
      this.countResurces = responseData;
    }, (error: any) => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
