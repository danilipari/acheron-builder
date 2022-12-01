import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JsonRenderComponent } from './json-render/json-render.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { QRCodeModule } from 'angularx-qrcode';


import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LottieRenderComponent } from './lottie-render/lottie-render.component';
import { SafePipe } from './safe.pipe';
import { QrcodeComponent } from './qrcode/qrcode.component';

export function playerFactory() {
  return player;
}


const components: Array<any> = [
  SidebarComponent,
  JsonRenderComponent,
  LottieRenderComponent,
  QrcodeComponent,
  SafePipe,
];

@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MatTooltipModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxJsonViewerModule,
    QRCodeModule,
  ],
  exports: [
    components,
  ],
})
export class SharedModule {}
