import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie';

@Injectable({ providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.split("/");
    if(url.some(part => part == 'poll') || url.some(part => part == 'user')) {
      const authToken = this.cookieService.get('SP_AUTH_TOKEN');
      req = req.clone({
        setHeaders: { Authorization: ` Bearer ${authToken}` }
      });
    }
    return next.handle(req);
  }

}
