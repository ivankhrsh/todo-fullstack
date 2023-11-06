import { IResetPassword, IUser } from '../modules/common/types/user.types';
import { HttpService } from './http.service';

class AuthService extends HttpService {
  private url: string;

  constructor(url = 'user') {
    super();
    this.url = url;
  }

  private getUrl(endpoint: string): string {
    return `${this.url}/${endpoint}`;
  }

  register(data: IUser) {
    return this.post({ url: this.getUrl('register'), data }, false);
  }

  login(data: IUser) {
    return this.post({ url: this.getUrl('login'), data }, false);
  }

  currentUserData() {
    return this.get({ url: this.getUrl('currentUser') });
  }

  changePassword(data: { password: string; newPassword: string }) {
    return this.patch({ url: this.getUrl('password/change'), data });
  }

  forgotPassword(data: { email: string }) {
    return this.post({ url: this.getUrl('password/reset'), data }, false);
  }

  resetPassword(data: IResetPassword) {
    return this.post({ url: this.getUrl('password/confirm-reset'), data }, false);
  }

  verifyEmail(passwordResetCode: string) {
    return this.get({ url: this.getUrl(`verify?passwordResetCode=${passwordResetCode}`) }, false);
  }
}

export const authService = new AuthService();
