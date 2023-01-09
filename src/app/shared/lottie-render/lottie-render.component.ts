import { Component, OnInit, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'acheron-lottie-render',
  template: `
    <ng-lottie
      [options]="icon"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `,
})
export class LottieRenderComponent implements OnInit {
  @Input() public route?: string = "/assets/lottie/";
  @Input() public name: string = "";

  icon: any;

  constructor() { }

  ngOnInit(): void {
    this.icon = this.convertLottieUrl(this.name);
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.debug(animationItem);
  }

  public convertLottieUrl(url: string): AnimationOptions {
    const svg: AnimationOptions = {
      path: `${this.route}${url}`,
    };

    return svg;
  }

}
