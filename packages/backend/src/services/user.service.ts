import { DeepPartial } from 'typeorm';
import { IUserCreate } from '../types/user.type';
import { User } from '../entities/User';

export default class UserService {
  async create(payload: IUserCreate) {
    const user = User.create(payload as DeepPartial<User>);
    const result = await User.save(user);
    return result;
  }

  async isUserAlreadyExist(id: string) {
    return Boolean(await this.findById(id));
  }

  async setNewPassword(id: string, password: string) {
    const user = await User.update(id, {
      password,
      passwordResetCode: '0',
      codeExpiresAt: '0'
    });
    return user;
  }

  async findById(id: string) {
    const user = await User.findOne({ where: { id }, relations: ['todos'] });
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ where: { email }, relations: ['todos'] });
    return user;
  }

  async verifyEmail(passwordResetCode: string) {
    const user = await User.update(
      { passwordResetCode },
      { verified: true, passwordResetCode: '' }
    );

    return user;
  }

  async findByResetCode(passwordResetCode: string) {
    const user = await User.findOne({ where: { passwordResetCode }, relations: ['todos'] });
    return user;
  }

  async setPasswordResetCode(id: string, code: string) {
    await User.update(
      { id },
      { passwordResetCode: code, codeExpiresAt: (Date.now() * 60 * 24 * 365).toString() }
    );
  }

  async delete(id: string) {
    await User.delete(id);
  }
}
