import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthService} from '../ngrx/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            if (event.status == HttpStatusCode.Unauthorized) {
              this.authService.logOut();
            }
          }
        })
      );
  }

}
