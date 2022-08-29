import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { NgxSpinnerModule } from 'ngx-spinner';

import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';

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
    HttpClientModule,
    DialogAlertMessagesModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
