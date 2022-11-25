import * as mirage from 'miragejs';
import endpoints, {LOG_IN, RESET_PASSWORD, SIGN_UP} from '../app/sp-common/api/endpoints';
import create_user_response from './response/create-user.rs';
import {log_in_response} from './response/log-in.rs';


export function createServer() {
  return mirage.createServer({
    routes() {
      this.post(`${endpoints[SIGN_UP]}`, (schema, request) => create_user_response, {timing: 2000});
      this.post(`${endpoints[LOG_IN]}`, (schema, request) => log_in_response(true), {timing: 2000});

      this.post(`${endpoints[RESET_PASSWORD]}`, (schema, request) => {
        return {
          error: null,
          payload: null
        }
      }, {timing: 2000});
    }
  })
}
