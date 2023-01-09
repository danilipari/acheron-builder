import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StrapiBabylon2Service } from './services/strapi-babylon2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  version: string = '1.0.0';
  min_title_header: string = 'AB';
  title_header: string = 'AcheronBuilder';

  title = 'acheron-builder';

  jwtStrapi: any;
  userStrapi: any;

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    // if (!localStorage.getItem("jwtStrap")) {
    //   this.strapiService.loginStrapi().pipe(takeUntil(this.unsubscribe$)).subscribe((responseData: any) => {
    //     this.jwtStrapi = responseData.data.token;
    //     this.userStrapi = responseData.data.user;
    //     localStorage.setItem("jwtStrap", responseData.data.token);
    //     localStorage.setItem("userStrap", JSON.stringify(responseData.data.user));
    //     // this.jwtStrapi && this.initWithJwt();
    //   }), (error: any) => {
    //     console.log(error);
    //   }
    // } else {
    //   const us: any = localStorage.getItem("userStrap");
    //   this.jwtStrapi = localStorage.getItem("jwtStrap");
    //   this.userStrapi = localStorage.getItem("userStrap") ? JSON.parse(us) : {};
    //   // /* this.initWithJwt(); */
    // }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
