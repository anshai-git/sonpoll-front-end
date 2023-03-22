import { createAction, props } from '@ngrx/store'
import { ApiResponse } from 'src/app/sp-common/api/ApiResponse'
import { SignUpResponse } from 'src/app/sp-common/response/sign-up.response'
import { ActionInProgress } from 'src/app/sp-common/types'
import { ApiRequest } from '../../sp-common/api/ApiRequest'
import { SignUpRequest } from '../../sp-common/request/sign-up.request'

export enum RegistrationActions {
  SET_ACTION_IN_PROGRESS = 'SET_ACTION_IN_PROGRESS',
  CLEAR_ACTION_IN_PROGRESS = 'CLEAR_ACTION_IN_PROGRESS',

  SIGN_UP = 'SIGN_UP',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
}

export const sign_up = createAction(
  RegistrationActions.SIGN_UP,
  props<{ payload: ApiRequest<SignUpRequest> }>()
)

export const sign_up_success = createAction(
  RegistrationActions.SIGN_UP_SUCCESS,
  props<{ payload: ApiResponse<SignUpResponse> }>()
)

export const sign_up_failure = createAction(
  RegistrationActions.SIGN_UP_FAILURE,
  props<{ payload: ApiResponse<SignUpResponse> }>()
)

export const set_action_in_progress = createAction(
  RegistrationActions.SET_ACTION_IN_PROGRESS,
  props<{ payload: ActionInProgress<RegistrationActions> }>()
)

export const clear_action_in_progress = createAction(
  RegistrationActions.CLEAR_ACTION_IN_PROGRESS,
  props<{ payload: RegistrationActions }>()
)
