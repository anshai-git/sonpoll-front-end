import {environment} from '../../../environments/environment';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

export const PASSWORD_RESET = 'PASSWORD_RESET';
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';

export default {
  [SIGN_UP]: `${environment.apiUrl}/signup`,
  [LOG_IN]: `${environment.apiUrl}/login`,

  [PASSWORD_RESET]: `${environment.apiUrl}/resetPassword`,
  [SET_NEW_PASSWORD]: `${environment.apiUrl}/setNewPassword`
}
