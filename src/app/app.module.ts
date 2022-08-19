import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogAlertMessagesModule } from './components/dialog-alert-messages/dialog-alert-messages.module';
import { DialogRenderModule } from './components/dialog-render/dialog-render.module';

const components: Array<any> = [
  /*  */
];

@NgModule({
  declarations: [
    AppComponent,
    components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DialogRenderModule,
    FormsModule,
    DialogAlertMessagesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
