import { IResetPassword, IUser, IUserLoginResponse } from '../../common/types/user.types';
import { authService } from '../../../service/auth.service';

class AuthHandler {
  async handleRegister(user: IUser) {
    const { data }: { data: IUserLoginResponse } = await authService.register(user);
    return { authorizationToken: data.authorizationToken, email: data.email, id: data.id };
  }

  async handleLogin(user: IUser) {
    const { data }: { data: IUserLoginResponse } = await authService.login(user);
    return { authorizationToken: data.authorizationToken, email: data.email, id: data.id };
  }

  async getCurrentUser() {
    const { data } = await authService.currentUserData();
    return data;
  }

  async changePassword(payload: { password: string; newPassword: string }) {
    const data = await authService.changePassword(payload);
    return data;
  }

  async forgotPassword(email: string) {
    const data = await authService.forgotPassword({ email });
    return data;
  }

  async resetPassword(body: IResetPassword) {
    const data = await authService.resetPassword(body);
    return data;
  }

  async verifyEmail(code: string) {
    const data = await authService.verifyEmail(code);
    return data;
  }
}

const authHandler = new AuthHandler();

export default authHandler;
