import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAlertMessagesModule } from './components/dialog-alert-messages/dialog-alert-messages.module';
import { DialogRenderModule } from './components/dialog-render/dialog-render.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MAT_MOMENT_DATE_FORMATS, MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MM YYYY',
  },
};


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
    MatTooltipModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
