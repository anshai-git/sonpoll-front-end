import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterBootComponent } from './register-boot/register-boot.component';
import { RegistrationComponent } from './views/registration/registration.component';


@NgModule({
  declarations: [
    RegisterBootComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
