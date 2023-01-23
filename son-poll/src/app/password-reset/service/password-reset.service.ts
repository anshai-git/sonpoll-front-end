import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiResponse } from '../../sp-common/api/ApiResponse'
import { ResetPasswordResponse } from '../../sp-common/response/reset-password.response'
import { ResetPasswordRequest } from '../../sp-common/request/reset-password.request'
import { Observable } from 'rxjs'
import { ApiRequest } from '../../sp-common/api/ApiRequest'
import endpoints, { PASSWORD_RESET } from '../../sp-common/api/endpoints'

@Injectable({
  providedIn: 'root'
})
export class  PasswordResetService {
  constructor(
    private http: HttpClient
  ) {}

  public sendResetRequest(request: ApiRequest<ResetPasswordRequest>): Observable<ApiResponse<ResetPasswordResponse>> {
   return this.http.post<ApiResponse<ResetPasswordResponse>>(endpoints[PASSWORD_RESET], request);
  }

}
