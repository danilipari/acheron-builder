import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogRenderComponent } from './components/dialog-render/dialog-render.component';

const components: Array<any> = [
  /*  */
];

@NgModule({
  declarations: [
    AppComponent,
    components,
    DialogRenderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
    components
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
