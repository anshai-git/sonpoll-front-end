import {createAction, props} from '@ngrx/store';
import {ApiRequest} from '../../sp-common/api/ApiRequest';
import {SignUpRequest} from '../../sp-common/request/sign-up.request';

export enum RegistrationActions {
  SET_ACTION_STATUS = 'SET_ACTION_STATUS',

  SIGN_UP = 'SIGN_UP',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
}

export const signUp = createAction(
  RegistrationActions.SIGN_UP,
  props<{ payload: ApiRequest<SignUpRequest>}>()
);

export const setActionStatus = createAction(
  RegistrationActions.SET_ACTION_STATUS,
  props<{ payload: boolean }>()
);
