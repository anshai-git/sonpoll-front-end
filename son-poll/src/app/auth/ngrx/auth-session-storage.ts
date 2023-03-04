import { Injectable } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import { AuthStorageService } from "./auth-storage";

@Injectable({ providedIn: 'root' })
export class SessionAuthStorage implements AuthStorageService {

  constructor(
    private storage: SessionStorageService
  ) {}

  storeAuthToken(value: string): void {
    this.storage.store('SP_AUTH_TOKEN', value);
  }

  clearData(): void {
    this.storage.clear();
  }

  getAuthToken(): string {
   return this.storage.retrieve('SP_AUTH_TOKEN');
  }

}
