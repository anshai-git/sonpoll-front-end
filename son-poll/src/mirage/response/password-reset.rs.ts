import { ApiResponse } from '../../app/sp-common/api/ApiResponse'
import { ResetPasswordResponse } from '../../app/sp-common/response/reset-password.response'

export function passwordResetResponse(): ApiResponse<ResetPasswordResponse> {
  let response: ResetPasswordResponse = {
    email: 'test@test.com'
  }
  let apiResponse: ApiResponse<ResetPasswordResponse> = {
    payload: response,
    error: null
  }
  return apiResponse;
}
