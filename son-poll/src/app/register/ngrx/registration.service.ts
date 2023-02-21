import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../sp-common/api/ApiResponse';
import {SignUpResponse} from '../../sp-common/response/sign-up.response';
import {ApiRequest} from '../../sp-common/api/ApiRequest';
import {SignUpRequest} from '../../sp-common/request/sign-up.request';
import endpoints, {SIGN_UP} from '../../sp-common/api/endpoints';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(
    private http: HttpClient
  ) {}

  public signUp(request: ApiRequest<SignUpRequest>): Observable<ApiResponse<SignUpResponse>> {
    return this.http.post<ApiResponse<SignUpResponse>>(`${endpoints[SIGN_UP]}`, request);
  }

}
