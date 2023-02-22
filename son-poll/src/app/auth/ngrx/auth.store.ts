import { User } from "src/app/sp-common/model/User";

export type SignupFormData = {
  // NOTE: It is set at signup from the signup form and it is used at signup completion for choosing the storage for the auth data
  stayLoggedIn: boolean;
}

export interface AuthStore {
  isActionInProgress: boolean;
  authToken: string;
  userData: User;

  signUpForm: SignupFormData
}

export const initialState: AuthStore = {
  isActionInProgress: false,
  signUpForm: {
    stayLoggedIn: false,
  },
  authToken: '',
  userData: {
    id: '',
    email: '',
    username: ''
  }
}
