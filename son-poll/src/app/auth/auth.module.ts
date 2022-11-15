import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './views/log-in/log-in.component';
import { AuthBootComponent } from './auth-boot/auth-boot.component';


@NgModule({
  declarations: [
    LogInComponent,
    AuthBootComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
