import {environment} from '../../../environments/environment';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

export default {
  [SIGN_UP]: `${environment.apiUrl}/signup`,
  [LOG_IN]: `${environment.apiUrl}/login`
}

