import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail';
import UserService from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);

    if (user) {
      return res.status(400).json({ message: 'User with this email is already exists' });
    }

    const hashPassword = await bcrypt.hash(password, Number(process.env.bcryptSalt));
    const newUser = await this.userService.create({ email, password: hashPassword });

    const verifyToken = uuidv4();

    await this.userService.setPasswordResetCode(newUser.id, verifyToken);

    const link = `${process.env.PAGE_URL}/verify?passwordResetCode=${verifyToken}`;
    await sendEmail(
      newUser.email,
      'Email confirmation',
      `Hello, ${newUser.email}. Please, click the link below to confirmation your email. ${link}`
    );

    res.json({
      message: 'Registration is successful, please verify email',
      email: newUser.email,
      id: newUser.id
    });
  }

  async verifyEmail(req: Request, res: Response) {
    const { passwordResetCode } = req.query;
    if (!passwordResetCode) {
      return res.status(400).json({ message: 'Provide token' });
    }
    await this.userService.verifyEmail(passwordResetCode as string);

    return res.status(200).json({ message: 'Verification is successful' });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'User is not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    const isEmailVerified = await this.userService.findByEmail(email);

    if (!isEmailVerified?.verified) {
      return res.status(401).json({ message: 'Please verify email' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 24 * 360
    });
    // time when token will expire and re login is required

    return res.json({
      email: user.email,
      id: user.id,
      authorizationToken: token
    });
  }

  async resetPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'User is not exist' });
    }

    const resetToken = uuidv4();

    await this.userService.setPasswordResetCode(user.id, resetToken);

    const link = `${process.env.PAGE_URL}/passwordReset?passwordResetCode=${resetToken}&id=${user.id}`;
    await sendEmail(
      user.email,
      'Reset password',
      `Hello, ${user.email}. Please, click the link below to reset your password. ${link}`
    );

    res.status(204).send();
  }

  async confirmResetPassword(req: Request, res: Response) {
    const { password, passwordResetCode } = req.body;

    const user = await this.userService.findByResetCode(passwordResetCode);

    if (!user) {
      return res.status(401).json({ message: 'Reset code is not exist or expired' });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.bcryptSalt));
    await this.userService.setNewPassword(user.id, hashedPassword);

    res.status(204).send();
  }

  async changePassword(req: Request, res: Response) {
    const { id, password: currentPassword } = req.user as { id: string; password: string };
    const { password, newPassword } = req.body;

    const isCorrectPreviousPassword = await bcrypt.compare(password, currentPassword);
    if (!isCorrectPreviousPassword) {
      return res.status(400).json({ message: 'Current password in incorrect' });
    }

    const isSamePassword = await bcrypt.compare(newPassword, currentPassword);
    if (isSamePassword) {
      return res.status(400).json({ message: 'Please use new password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.bcryptSalt));
    await this.userService.setNewPassword(id, hashedPassword);

    res.json({ message: 'Password is changed' });
  }

  async getCurrentUserEmail(req: Request, res: Response) {
    const { email, id } = req.user as { email: string; id: string };
    res.json({ email, id });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.user as { id: string };
    await this.userService.delete(id);
    res.status(204).send();
  }
}

const userController = new UserController(new UserService());
export default userController;
