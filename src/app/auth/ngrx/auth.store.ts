import { User } from "src/app/sp-common/model/User";
import { ActionInProgress } from "src/app/sp-common/types";
import {AuthActions} from "./auth.actions";

export type AuthFormData = {
  // NOTE: It is set at signup from the signup form and it is used at signup completion for choosing the storage for the auth data
  keep_logged_in: boolean;
}

export interface AuthStore {
  in_progress_actions: Array<ActionInProgress<AuthActions>>;
  auth_token: string;
  user_data: User;

  auth_form_data: AuthFormData
}

export const initial_state: AuthStore = {
  in_progress_actions: new Array<ActionInProgress<AuthActions>>(),
  auth_form_data: {
    keep_logged_in: false,
  },
  auth_token: '',
  user_data: {
    id: '',
    email: '',
    username: ''
  }
}
