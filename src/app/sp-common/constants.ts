export enum ErrorCode {
  UNEXPECTED_ERROR = 'UNEXPEXTED_ERROR',

  USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_USERNAME = 'INVALID_USERNAME',
}

export const ErrorMessages = {
  // login
  [ErrorCode.INVALID_PASSWORD]: 'The password entered is invalid',
  [ErrorCode.INVALID_USERNAME]: 'The username entered doen\'t exist',

  // signup
  [ErrorCode.USERNAME_ALREADY_EXISTS]: 'The username entered already exists',

  // unexpeced errors
  [ErrorCode.UNEXPECTED_ERROR]: 'Something went wrong, please try again',
}

export function getErrorMessageFromCode(code: ErrorCode) {
  return ErrorMessages[code];
}
