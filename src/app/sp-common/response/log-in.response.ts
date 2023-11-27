import { User } from "../model/User";

export class LogInResponse {
  constructor(
    public token: string,
    public user: User
  ) { }
}
