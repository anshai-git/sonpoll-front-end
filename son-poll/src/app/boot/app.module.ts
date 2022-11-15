import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SpCommonModule} from '../sp-common/sp-common.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
