import {ApiError} from './ApiError';

export class ApiResponse<T> {
  constructor(
    public payload: T,
    public error: ApiError
  ) {}
}
