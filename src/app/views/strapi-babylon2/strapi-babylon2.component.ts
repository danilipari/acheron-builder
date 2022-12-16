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

  labels: Array<string> = [
    "Categories",
    "Countries",
    // "Tests",
    "Labels",
    // "Users",
  ];

  constructor(private strapiService: StrapiBabylon2Service) {}

  ngOnInit(): void {
    if (!localStorage.getItem("jwtStrap")) {
      this.strapiService.loginStrapi().subscribe((responseData: any) => {
        this.jwtStrapi = responseData.data.token;
        this.userStrapi = responseData.data.user;
        localStorage.setItem("jwtStrap", responseData.data.token);
        localStorage.setItem("userStrap", JSON.stringify(responseData.data.user));

        this.jwtStrapi && this.initWithJwt();
      }), (error: any) => {
        console.log(error);
      }
    } else {
      const us: any = localStorage.getItem("userStrap");
      this.jwtStrapi = localStorage.getItem("jwtStrap");
      this.userStrapi = localStorage.getItem("userStrap") ? JSON.parse(us) : {};

      this.initWithJwt();
    }
  }

  private loginStrapi(): void {
    this.strapiService.loginStrapi().subscribe((responseData: any) => {
      this.jwtStrapi = responseData.data.token;
      this.userStrapi = responseData.data.user;
      localStorage.setItem("jwtStrap", responseData.data.token);
      localStorage.setItem("userStrap", JSON.stringify(responseData.data.user));

      this.jwtStrapi && this.initWithJwt();
    }, (error: any) => {
      console.log(error);
    });
  }

  private initWithJwt(): void {
    this.strapiService.getContentTypes().subscribe((responseData: any) => {
      this.contentTypes = responseData.data?.filter((el: any) => el.isDisplayed && this.labels.includes(el.info.label)).map((el: any) => ({ ...el, info: { ...el.info, path: el.info.label?.toLowerCase() } }));
    }), (error: any) => {
      this.errorJWTStrapi();
      console.log(error);
    }
  }

  private errorJWTStrapi(): string {
    this.jwtStrapi = localStorage.removeItem("jwtStrap");
    this.userStrapi = localStorage.removeItem("userStrap");
    this.ngOnInit();
    return "Clean Strapi lcoal data";
  }

  public logOutStrapi(): void {
    this.jwtStrapi = localStorage.removeItem("jwtStrap");
    this.userStrapi = localStorage.removeItem("userStrap");
  }

  public sessionStrapi(action: string = "in"): void {
    if (action === "out") {
      this.jwtStrapi = localStorage.removeItem("jwtStrap");
      this.userStrapi = localStorage.removeItem("userStrap");
    } else {
      this.loginStrapi();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
