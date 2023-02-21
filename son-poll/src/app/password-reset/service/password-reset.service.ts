import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiResponse } from '../../sp-common/api/ApiResponse'
import { ResetPasswordResponse } from '../../sp-common/response/reset-password.response'
import { ResetPasswordRequest } from '../../sp-common/request/reset-password.request'
import { Observable } from 'rxjs'
import { ApiRequest } from '../../sp-common/api/ApiRequest'
import endpoints, { PASSWORD_RESET, SET_NEW_PASSWORD } from '../../sp-common/api/endpoints'
import { SetNewPasswordRequest } from 'src/app/sp-common/request/set-new-password.request'
import { SetNewPasswordResponse } from 'src/app/sp-common/response/set-new-password.response'

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {
    constructor(
        private http: HttpClient
    ) {}

    public sendResetRequest(request: ApiRequest<ResetPasswordRequest>): Observable<ApiResponse<ResetPasswordResponse>> {
        return this.http.post<ApiResponse<ResetPasswordResponse>>(endpoints[PASSWORD_RESET], request);
    }

    public sendSetNewPasswordRequest(request: ApiRequest<SetNewPasswordRequest>): Observable<ApiResponse<SetNewPasswordResponse>> {
        return this.http.post<ApiResponse<SetNewPasswordResponse>>(endpoints[SET_NEW_PASSWORD], request);
    }
}
