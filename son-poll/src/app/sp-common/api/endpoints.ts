import {environment} from '../../../environments/environment';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

export const PASSWORD_RESET = 'PASSWORD_RESET';

export default {
  [SIGN_UP]: `${environment.apiUrl}/signup`,
  [LOG_IN]: `${environment.apiUrl}/login`,
  [PASSWORD_RESET]: `${environment.apiUrl}/resetPassword`,
}

