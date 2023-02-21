export class SetNewPasswordRequest {
    constructor(
        public token: string,
        public password: string
    ) {}
}
