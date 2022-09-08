import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxBootstrapIconsModule.pick(allIcons),
  ]
})
export class DashboardModule { }
