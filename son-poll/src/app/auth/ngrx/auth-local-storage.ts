import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { AuthStorageService } from "./auth-storage";

@Injectable({ providedIn: 'root' })
export class LocalAuthStorage implements AuthStorageService {

  constructor(
    private storage: LocalStorageService
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
