import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../ngrx/auth.service';

@Injectable({providedIn: 'root'})
export class UnauthenticatedGuard  {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.is_authenticated();

    if (isAuthenticated) this.router.navigate(['/web']);
    return !isAuthenticated;
  }
}
