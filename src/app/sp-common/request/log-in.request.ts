export class LogInRequest {
  constructor(
    public username: string,
    public password: string,
    public keepLoggedIn: boolean
  ) { }
}
