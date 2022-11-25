import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StrapiBabylon2Service } from './../../services/strapi-babylon2.service';

@Component({
  selector: 'app-strapi-babylon2',
  templateUrl: './strapi-babylon2.component.html',
  styleUrls: ['./strapi-babylon2.component.scss']
})
export class StrapiBabylon2Component implements OnInit, OnDestroy {
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  jwtStrapi: any;
  userStrapi: any;
  contentTypes: any[] = [];

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    if (!localStorage.getItem("jwtStrap")) {
      this.strapiService.loginStrapi().subscribe((responseData: any) => {
        this.jwtStrapi = responseData.data.token;
        this.userStrapi = responseData.data.user;
        localStorage.setItem("jwtStrap", responseData.data.token);
        localStorage.setItem("userStrap", JSON.stringify(responseData.data.user));
      }), (error: any) => {
        console.log(error);
      }
    } else {
      const us: any = localStorage.getItem("userStrap");
      this.jwtStrapi = localStorage.getItem("jwtStrap");
      this.userStrapi = localStorage.getItem("userStrap") ? JSON.parse(us) : {};

      this.init();
    }
  }

  private init(): void {
    this.strapiService.getContentTypes().subscribe((responseData: any) => {
      this.contentTypes = responseData.data?.filter((el: any) => el.isDisplayed);
    }), (error: any) => {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
