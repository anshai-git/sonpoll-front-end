import {environment} from '../../../environments/environment';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

export const RESET_PASSWORD = 'RESET_PASSWORD';

export default {
  [SIGN_UP]: `${environment.apiUrl}/signup`,
  [LOG_IN]: `${environment.apiUrl}/login`,

  [RESET_PASSWORD]: `${environment.apiUrl}/resetPassword`
}

