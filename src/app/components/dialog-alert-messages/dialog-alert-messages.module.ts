import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogAlertMessagesComponent } from './dialog-alert-messages.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [DialogAlertMessagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxBootstrapIconsModule.pick(allIcons),
    AppRoutingModule,
  ],
})
export class DialogAlertMessagesModule {}
