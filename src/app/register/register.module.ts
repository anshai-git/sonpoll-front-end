import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterBootComponent } from './register-boot/register-boot.component';
import { RegistrationComponent } from './views/registration/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {EffectsModule} from '@ngrx/effects';
import {RegistrationEffects} from './ngrx/registration.effects';
import {StoreModule} from '@ngrx/store';
import {registrationReducer} from './ngrx/registration.reducer';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import { RegistrationSuccessComponent } from './views/registration-success/registration-success.component';
import { RegistrationFailureComponent } from './views/registration-failure/registration-failure.component';


@NgModule({
  declarations: [
    RegisterBootComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    RegistrationFailureComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
    StoreModule.forFeature('registration', registrationReducer),
    EffectsModule.forFeature([RegistrationEffects]),
    ButtonModule,
    RippleModule,
  ],
  providers: [
    MessageService
  ]
})
export class RegisterModule { }
