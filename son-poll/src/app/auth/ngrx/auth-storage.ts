/**
  * Represents the common interface between services that store authentication data
  *
  *
  */
export interface AuthStorageService {
  storeAuthToken(value: string): void;
  clearData(): void;
  getAuthToken(): string;
}
