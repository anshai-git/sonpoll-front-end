import { ApiError } from "src/app/sp-common/api/ApiError";
import { ApiResponse } from "src/app/sp-common/api/ApiResponse";
import { LogInResponse } from "src/app/sp-common/response/log-in.response";

export function log_in_response(request: any): ApiResponse<LogInResponse> {
  const body = JSON.parse(request.requestBody);
  const response: LogInResponse = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    user: {
      id: 'mock_id',
      username: 'mock_username',
      email: 'mock@mock.email',
    }
  };
  const error_response: LogInResponse = {
    token: '',
    user: { id: '', username: '', email: '' }
  };

  return body.payload.username == 'valid' ?
    {
      payload: response,
      error: null,
    } :
    {
      payload: error_response,
      error: new ApiError("ERROR_CODE", "Error message")
    } as ApiResponse<LogInResponse>;
}
