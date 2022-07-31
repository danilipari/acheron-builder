import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogRenderComponent } from './components/dialog-render/dialog-render.component';

const components: Array<any> = [
  SidebarComponent,
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
