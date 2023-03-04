import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, Subscription } from 'rxjs';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';
import endpoints, { LOG_IN, PASSWORD_RESET } from '../../sp-common/api/endpoints';
import { ApiRequest } from '../../sp-common/api/ApiRequest';
import { LogInRequest } from '../../sp-common/request/log-in.request';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SendPasswordResetEmailRequest } from '../../sp-common/request/send-password-reset-email.request';
import { Store } from '@ngrx/store';
import * as AuthSelectors from './auth.selectors';
import { AuthFormData } from './auth.store';
import { AuthStorageService } from './auth-storage';
import { match } from 'match-toy';
import { LocalAuthStorage } from './auth-local-storage';
import { SessionAuthStorage } from './auth-session-storage';
import { User } from 'src/app/sp-common/model/User';
import { none, Option, some } from 'fp-ts/lib/Option';

export enum AuthenticationPersistence {
  SESSION = 'SESSION',
  CONSTANT = 'CONSTANT'
}

export type AuthData = {
  authToken: string;
  userData: Partial<User>;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {

  jwtHelper: JwtHelperService;
  authFormDataSubscription: Subscription;

  authFormData!: AuthFormData;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private store$: Store,
    private authSessionStorage: SessionAuthStorage,
    private authLocalStorage: LocalAuthStorage,
  ) {
    this.jwtHelper = new JwtHelperService();

    this.authFormDataSubscription = this.store$.select(AuthSelectors.selectAuthFormData)
      .pipe(filter(d => d != undefined))
      .subscribe(formData => {
        this.authFormData = formData;
      })
  }

  ngOnDestroy(): void {
    this.authFormDataSubscription.unsubscribe();
  }

  loadAuthData(): Option<AuthData> {
    const authPersistenceType: AuthenticationPersistence = this.getSavedAuthPersistenceType();

    if (authPersistenceType) {
      const authData = this.loadAuthDataByPersstenceType(authPersistenceType);
      return some(authData);
    } else {
      this.authSessionStorage.clearData();
      this.authLocalStorage.clearData();
    }
    return none;
  }

  loadAuthDataByPersstenceType(persistenceType: AuthenticationPersistence): AuthData {
    const authToken = this.getAuthStorageServiceByPersistenceType(persistenceType)
      .getAuthToken();
    return {
      authToken,
      // TODO: this also needs to be filed from the response
      userData: {}
    }
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
    const authPersistenceType: AuthenticationPersistence = this.getAuthPersistenceTypeFromForm();
    this.cookieService.put('SP_AP', authPersistenceType);

    const authStorage: AuthStorageService = this.getAuthStorageServiceByPersistenceType(authPersistenceType);
    authStorage.storeAuthToken(response.token);

    this.router.navigate(['platform']);
  }

  getAuthPersistenceTypeFromForm(): AuthenticationPersistence {
    return this.authFormData?.rememberUser ? AuthenticationPersistence.CONSTANT : AuthenticationPersistence.SESSION;
  }

  getSavedAuthPersistenceType(): AuthenticationPersistence {
    const stringValue = this.cookieService.get('SP_AP');
    const fromString = match
      .case('SESSION', () => AuthenticationPersistence.SESSION)
      .case('CONSTANT', () => AuthenticationPersistence.SESSION)
      .else(() => null)
      .end();
    const type: AuthenticationPersistence = fromString(stringValue);
    return type;
  }

  getAuthStorageServiceByPersistenceType(persistenceType: AuthenticationPersistence): AuthStorageService {
    // WARN: could local storage or session storage be unavailable?!
    const matcher = match
      .case(AuthenticationPersistence.SESSION, () => this.authSessionStorage)
      .case(AuthenticationPersistence.CONSTANT, () => this.authLocalStorage)
      .else(() => this.authSessionStorage)
      .end();

    return matcher(persistenceType);
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
