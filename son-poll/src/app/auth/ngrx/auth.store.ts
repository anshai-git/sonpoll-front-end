export interface AuthStore {
  isActionInProgress: boolean;
}

export const initialState: AuthStore = {
  isActionInProgress: false
}
