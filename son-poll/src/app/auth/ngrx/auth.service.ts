import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../sp-common/api/ApiResponse';
import {LogInResponse} from '../../sp-common/response/log-in.response';
import endpoints, {LOG_IN} from '../../sp-common/api/endpoints';
import {ApiRequest} from '../../sp-common/api/ApiRequest';
import {LogInRequest} from '../../sp-common/request/log-in.request';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({providedIn: 'root'})
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

  handleLogInSuccess(response: LogInResponse) {
    console.log(response);
    // document.cookie = `SP_AUTH_TOKEN=${response.payload.token}`;
    this.cookieService.put('SP_AUTH_TOKEN', response.token);
    this.router.navigate(['test']);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('SP_AUTH_TOKEN')
    console.log(token);
    let isAuthenticated;
    try {
      isAuthenticated = !this.jwtHelper.isTokenExpired(token);
    } catch (err) {
      isAuthenticated = false;
    }
    return isAuthenticated;
  }

  logOut() {
    this.cookieService.remove('SP_AUTH_TOKEN');
  }
}
