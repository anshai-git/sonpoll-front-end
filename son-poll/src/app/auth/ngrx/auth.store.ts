import { User } from "src/app/sp-common/model/User";

export type AuthFormData = {
  // NOTE: It is set at signup from the signup form and it is used at signup completion for choosing the storage for the auth data
  rememberUser: boolean;
}

export interface AuthStore {
  isActionInProgress: boolean;
  authToken: string;
  userData: User;

  authFormData: AuthFormData
}

export const initialState: AuthStore = {
  isActionInProgress: false,
  authFormData: {
    rememberUser: false,
  },
  authToken: '',
  userData: {
    id: '',
    email: '',
    username: ''
  }
}
