export interface IUser {
  email: string;
  password: string;
}

export interface IResetPassword {
  password: string;
  passwordResetCode: string;
}

export interface IUserLoginResponse {
  authorizationToken: string;
  email: string;
  id: string;
}

export interface IChangePasswordPayload {
  password: string;
  newPassword: string;
}
