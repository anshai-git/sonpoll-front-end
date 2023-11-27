import * as mirage from 'miragejs';
import endpoints, { LOG_IN, PASSWORD_RESET, SET_NEW_PASSWORD, SIGN_UP } from '../app/sp-common/api/endpoints'
import create_user_response from './response/create-user.rs';
import { log_in_response } from './response/log-in.rs';
import { passwordResetResponse, setNewPasswordResponse } from './response/password-reset.rs'

function timing(t: number) {
  return { timing: t }
}

export function createServer() {
  return mirage.createServer({
    routes() {
      this.post(`${endpoints[SIGN_UP]}`, (schema, request) => create_user_response, timing(2000));
      this.post(`${endpoints[LOG_IN]}`, (schema, request) => log_in_response(request), timing(2000));
      this.post(`${endpoints[PASSWORD_RESET]}`, (schema, request) => passwordResetResponse(request), timing(2000));
      this.post(`${endpoints[SET_NEW_PASSWORD]}`, (schema, request) => setNewPasswordResponse(request), timing(2000));
    }
  })
}
