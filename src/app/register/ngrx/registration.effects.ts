import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { clear_action_in_progress, RegistrationActions, set_action_in_progress, sign_up, sign_up_failure, sign_up_success } from './registration.actions';
import { map, mergeMap, of, tap } from 'rxjs';
import { RegistrationService } from './registration.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class RegistrationEffects {
  constructor(
    private actions$: Actions,
    private registration_service: RegistrationService,
    private prime_ng_notification: MessageService
  ) { }

  sign_up$ = createEffect(() => this.actions$.pipe(
    ofType(sign_up),
    mergeMap((action) => this.registration_service.sign_up(action.payload)
      .pipe(
        map(response => !response.error ? sign_up_success({ payload: response }) : sign_up_failure({ payload: response }))
      ))
  ))

  sign_up_action_start$ = createEffect(() => this.actions$.pipe(
    ofType(sign_up),
    mergeMap((action) => of({ started_at: new Date(), action: action.type })
      .pipe(
        map((value) => set_action_in_progress({ payload: value }))
      ))
  ))

  sign_up_action_end$ = createEffect(() => this.actions$.pipe(
    ofType(RegistrationActions.SIGN_UP_SUCCESS, RegistrationActions.SIGN_UP_FAILURE),
    mergeMap(() => of(RegistrationActions.SIGN_UP).pipe(
      tap(() => this.prime_ng_notification.add({ severity: 'success', summary: 'Sign up success!', detail: 'test details :)' })),
      map(value => clear_action_in_progress({ payload: value }))
    ))
  ))
}
