import * as mirage from 'miragejs';
import endpoints, { LOG_IN, PASSWORD_RESET, SIGN_UP } from '../app/sp-common/api/endpoints'
import create_user_response from './response/create-user.rs';
import {log_in_response} from './response/log-in.rs';
import { passwordResetResponse } from './response/password-reset.rs'

export function createServer() {
  return mirage.createServer({
    routes() {
      this.post(`${endpoints[SIGN_UP]}`, (schema, request) => create_user_response, { timing: 2000 });
      this.post(`${endpoints[LOG_IN]}`, (schema, request) => log_in_response(true), { timing: 2000 });
      this.post(`${endpoints[PASSWORD_RESET]}`, (schema, request) => passwordResetResponse(), { timing: 2000 });
    }
  })
}
