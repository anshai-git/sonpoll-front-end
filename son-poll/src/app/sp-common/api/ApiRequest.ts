export class ApiRequest<T> {
  constructor(public payload: T) {}

  public static of<T>(payload: T) {
    return new ApiRequest(payload);
  }
}
