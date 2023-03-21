import { createAction, props } from '@ngrx/store';
import { ApiResponse } from 'src/app/sp-common/api/ApiResponse';
import { SignUpResponse } from 'src/app/sp-common/response/sign-up.response';
import { ApiRequest } from '../../sp-common/api/ApiRequest';
import { SignUpRequest } from '../../sp-common/request/sign-up.request';

export enum RegistrationActions {
  SET_ACTION_STATUS = 'SET_ACTION_STATUS',

  SIGN_UP = 'SIGN_UP',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
}

export const signUp = createAction(
  RegistrationActions.SIGN_UP,
  props<{ payload: ApiRequest<SignUpRequest> }>()
);

export const signUpSuccess = createAction(
  RegistrationActions.SIGN_UP_SUCCESS,
  props<{ payload: ApiResponse<SignUpResponse> }>()
);

export const signUpFailure = createAction(
  RegistrationActions.SIGN_UP_FAILURE,
  props<{ payload: ApiResponse<SignUpResponse> }>()
);

export const setActionStatus = createAction(
  RegistrationActions.SET_ACTION_STATUS,
  props<{ payload: boolean }>()
);
