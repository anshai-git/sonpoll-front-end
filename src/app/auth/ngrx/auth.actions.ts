import { createAction, props } from '@ngrx/store'
import { ApiRequest } from '../../sp-common/api/ApiRequest'
import { LogInRequest } from '../../sp-common/request/log-in.request'
import { ApiResponse } from '../../sp-common/api/ApiResponse'
import { LogInResponse } from '../../sp-common/response/log-in.response'
import { User } from 'src/app/sp-common/model/User'
import { AuthFormData } from './auth.store'
import { ActionInProgress } from 'src/app/sp-common/types'

// TODO: at logout we should clear / reset the whole ngrx store !!!
export enum AuthActions {
  SET_ACTION_STATUS = 'SET_ACTION_STATUS',

  LOG_IN = 'LOG_IN',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',

  LOAD_AUTH_DATA = 'LOAD_AUTH_DATA',

  SET_AUTH_DATA = 'SET_AUTH_DATA',
  CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA',

  SET_LOGIN_FORM_DATA = 'SET_LOGIN_FORM_DATA',
  CLEAR_LOGIN_FORM_DATA = 'CLEAR_LOGIN_FORM_DATA',
}

export const set_action_in_progress = createAction(
  AuthActions.SET_ACTION_STATUS,
  props<{ payload: ActionInProgress<AuthActions> }>()
)

export const unset_action_in_progress = createAction(
  AuthActions.SET_ACTION_STATUS,
  props<{ payload: AuthActions }>()
)

export const log_in = createAction(
  AuthActions.LOG_IN,
  props<{ payload: ApiRequest<LogInRequest> }>()
)

export const log_in_success = createAction(
  AuthActions.LOG_IN_SUCCESS,
  props<{ payload: ApiResponse<LogInResponse> }>()
)

export const log_in_failure = createAction(
  AuthActions.LOG_IN_FAILURE,
  props<{ payload: ApiResponse<LogInResponse> }>()
)

export const load_auth_data = createAction(AuthActions.LOAD_AUTH_DATA)

export const set_auth_data = createAction(
  AuthActions.SET_AUTH_DATA,
  props<{ payload: { user_data: User, auth_token: string } }>()
)

export const clear_auth_data = createAction(AuthActions.CLEAR_AUTH_DATA)

export const set_login_form_data = createAction(
  AuthActions.SET_LOGIN_FORM_DATA,
  props<{ payload: AuthFormData }>()
)

export const clear_login_form_data = createAction(AuthActions.CLEAR_LOGIN_FORM_DATA)
