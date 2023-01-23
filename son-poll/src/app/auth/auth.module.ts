import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './views/log-in/log-in.component';
import { AuthBootComponent } from './auth-boot/auth-boot.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './ngrx/auth.effects';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './ngrx/auth.reducer';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [
    LogInComponent,
    AuthBootComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    FormsModule,
    DialogModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', { auth: authReducer }),
  ],
})
export class AuthModule { }
