import {Injectable} from '@angular/core';
import {RegisterModule} from '../register.module';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RegistrationActions, signUp} from './registration.actions';
import {map, mergeMap, of, tap} from 'rxjs';
import {RegistrationService} from './registration.service';
import {MessageService} from 'primeng/api';

@Injectable({ providedIn: 'root'})
export class RegistrationEffects {
  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
    private messageService: MessageService
  ) {}

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(signUp),
    mergeMap((action) => this.registrationService.signUp(action.payload)
      .pipe(
        map(response => !response.error ? ({ type: RegistrationActions.SIGN_UP_SUCCESS }) : ({type: RegistrationActions.SIGN_UP_FAILURE}))
      ))
  ))

  actionStart$ = createEffect(() => this.actions$.pipe(
    ofType(signUp),
    mergeMap((action) => of(true).pipe(
      map(value => ({type: RegistrationActions.SET_ACTION_STATUS, payload: value }))
    ))
  ))

  actionEnd$ = createEffect(() => this.actions$.pipe(
    ofType(RegistrationActions.SIGN_UP_SUCCESS, RegistrationActions.SIGN_UP_FAILURE),
    mergeMap((action) => of(false).pipe(
      tap(() => this.messageService.add({severity: 'success', summary: 'Sign up success!', detail: 'test details :)'})),
      map(value => ({type: RegistrationActions.SET_ACTION_STATUS, payload: value }))
    ))
  ))
}
