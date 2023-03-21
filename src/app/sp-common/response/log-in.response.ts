import { User } from "../model/User";

export class LogInResponse {
  public static from_valid(data: Object) {

  }

  constructor(
    public success: boolean,
    public token: string,
    public user: User
  ) { }
}
