import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor(
    private cookieService: CookieService,
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService
  ) { }

  saveInLocalStorage(key: string, value: string): void {
    // WARN: could local storage be unavailable?
    this.localStorage.store(key, value);
  }

  saveInSessionStorage(key: string, value: string): void {
    // WARN: could session storage be unavailable?
    this.sessionStorage.store(key, value);
  }

  saveInCookie(key: string, value: string): void {
    this.cookieService.put(key, value);
  }
}
