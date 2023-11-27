import { ApiError } from 'src/app/sp-common/api/ApiError';
import { SetNewPasswordResponse } from 'src/app/sp-common/response/set-new-password.response';
import { ApiResponse } from '../../app/sp-common/api/ApiResponse'
import { ResetPasswordResponse } from '../../app/sp-common/response/reset-password.response'
import { match } from 'argus';

export function passwordResetResponse(request: any): ApiResponse<ResetPasswordResponse> {
  const body = JSON.parse(request.requestBody);
  let response: ResetPasswordResponse = { email: 'test@test.com' }
  let error_response: ResetPasswordResponse = { email: '' }

  const email: string = body.payload.email;
  const result: any = match(email)
    .with('valid@test.com', () => ({ payload: response, error: null }))
    .with('notfound@test.com', () => ({ payload: error_response, error: null }))
    .otherwise(() => ({ payload: null, error: null }));

  return result as ApiResponse<ResetPasswordResponse>;
}

export function setNewPasswordResponse(request: any): ApiResponse<SetNewPasswordResponse> {
  const body = JSON.parse(request.requestBody);
  let response: SetNewPasswordResponse = { token: 'auth_token_asdasdasfas12jkdf' };
  let error_response: SetNewPasswordResponse = { token: '' };

  return body.payload.password == 'valid' ? {
    payload: response,
    error: null
  } : {
    payload: error_response,
    error: null
  } as ApiResponse<SetNewPasswordResponse>;
}
