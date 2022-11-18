import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
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
            // TODO: move the unauthorized code to a constant (create a class for it)
            if (event.body.error.code == 'UNAUTHORIZED') {
              this.authService.logOut();
            }
          }
        })
      );
  }

}
