import { ActionInProgress } from "src/app/sp-common/types"
import { RegistrationActions } from "./registration.actions"

export interface RegistrationState {
  actions_in_progress: Array<ActionInProgress<RegistrationActions>>
}

export const initial_state: RegistrationState = {
  actions_in_progress: new Array<ActionInProgress<RegistrationActions>>()
}
