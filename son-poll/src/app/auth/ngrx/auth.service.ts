import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';
import endpoints, { LOG_IN, PASSWORD_RESET } from '../../sp-common/api/endpoints';
import { ApiRequest } from '../../sp-common/api/ApiRequest';
import { LogInRequest } from '../../sp-common/request/log-in.request';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SendPasswordResetEmailRequest } from '../../sp-common/request/send-password-reset-email.request';

@Injectable({ providedIn: 'root' })
export class AuthService {

  jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  logIn(request: ApiRequest<LogInRequest>): Observable<ApiResponse<LogInResponse>> {
    return this.http.post<ApiResponse<LogInResponse>>(`${endpoints[LOG_IN]}`, request);
  }

  // TODO: should have diferent logic for different type of authentications
  // - we should only save the token inside a cookie if the user wants to stay logged in else it should be saved somewhere like the session storage

  // TODO: we should store the auth token inside the ngrx store:
  // - popule it at application startup from cookies or session storage
  // - populate it at register in case if we log in after it automagically
  // - populate it at password reset in case if we log in after it automagically

  handleLogInSuccess(response: LogInResponse) {
    this.cookieService.put('SP_AUTH_TOKEN', response.token);
    this.router.navigate(['test']);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('SP_AUTH_TOKEN')
    let isAuthenticated;
    try {
      isAuthenticated = !this.jwtHelper.isTokenExpired(token);
    } catch (err) {
      isAuthenticated = false;
    }
    return isAuthenticated;
  }

  sendPasswordResetEmail(request: ApiRequest<SendPasswordResetEmailRequest>): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(endpoints[PASSWORD_RESET], request);
  }

  logOut() {
    this.cookieService.remove('SP_AUTH_TOKEN');
  }
}
