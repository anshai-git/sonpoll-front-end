import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './views/log-in/log-in.component';
import { AuthBootComponent } from './auth-boot/auth-boot.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './ngrx/auth.effects';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './ngrx/auth.reducer';


@NgModule({
  declarations: [
    LogInComponent,
    AuthBootComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', { auth: authReducer })
  ],
})
export class AuthModule { }
