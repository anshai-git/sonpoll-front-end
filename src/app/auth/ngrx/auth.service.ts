import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';
import endpoints, { LOG_IN, PASSWORD_RESET } from '../../sp-common/api/endpoints';
import { ApiRequest } from '../../sp-common/api/ApiRequest';
import { LogInRequest } from '../../sp-common/request/log-in.request';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SendPasswordResetEmailRequest } from '../../sp-common/request/send-password-reset-email.request';
import { AuthFormData } from './auth.store';
import { User } from 'src/app/sp-common/model/User';
import { none, Option } from 'fp-ts/lib/Option';

export type AuthData = {
  auth_token: string;
  user_data: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {

  jwt_helper: JwtHelperService;

  auth_form_data!: AuthFormData;

  constructor(
    private http: HttpClient,
    private cookie_service: CookieService
  ) {
    this.jwt_helper = new JwtHelperService();
  }

  ngOnDestroy(): void {
  }

  load_auth_data(): Option<AuthData> {
    return none;
  }

  log_in(request: ApiRequest<LogInRequest>): Observable<ApiResponse<LogInResponse>> {
    return this.http.post<ApiResponse<LogInResponse>>(`${endpoints[LOG_IN]}`, request);
  }

  // TODO: should have different logic for different type of authentications
  // - we should only save the token inside a cookie if the user wants to stay logged in else it should be saved somewhere like the session storage

  // TODO: we should store the auth token inside the ngrx store:
  // - populate it at application startup from cookies or session storage
  // - populate it at register in case if we log in after it automagically
  // - populate it at password reset in case if we log in after it automagically

  create_auth_cookie(response: LogInResponse) {
    this.cookie_service.put('SP_AUTH_TOKEN', response.token);
  }

  is_authenticated(): boolean {
    const token = this.cookie_service.get('SP_AUTH_TOKEN')
    let is_authenticated;
    try {
      is_authenticated = !this.jwt_helper.isTokenExpired(token);
    } catch (err) {
      is_authenticated = false;
    }
    return is_authenticated;
  }

  sendPasswordResetEmail(request: ApiRequest<SendPasswordResetEmailRequest>): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(endpoints[PASSWORD_RESET], request);
  }

  logOut() {
    this.cookie_service.remove('SP_AUTH_TOKEN');
  }
}
