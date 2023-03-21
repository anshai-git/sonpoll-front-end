export function log_in_response(success: boolean) {
  return success ?
    {
      payload: {
        id: 'mock_id',
        username: 'mock_username',
        email: 'mock@mock.email',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      error: null,
    } :
    {
      payload: null,
      error: ""
    }
}
