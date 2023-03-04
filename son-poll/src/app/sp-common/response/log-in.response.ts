import { User } from "../model/User";

export class LogInResponse {
  constructor(
    public success: boolean,
    public token: string,
    public user: Partial<User>
  ) {}
}
