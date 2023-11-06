import { Router } from 'express';
import userController from '../../controllers/user.controller';
import validator from '../../validators/generic.validator';
import validationSchemes from '../../validators/validation.schemas';
import { authenticate } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post(
  '/register',
  validator.isBodyValid(validationSchemes.authSchema).bind(validator),
  userController.register.bind(userController)
);

router.get(
  '/currentUser',
  authenticate('jwt'),
  userController.getCurrentUserEmail.bind(userController)
);

router.get('/verify', userController.verifyEmail.bind(userController));

router.post(
  '/login',
  validator.isBodyValid(validationSchemes.authSchema).bind(validator),
  userController.login.bind(userController)
);

router.delete('/', authenticate('jwt'), userController.deleteUser.bind(userController));

router.patch(
  '/password/change',
  authenticate('jwt'),
  validator.isBodyValid(validationSchemes.changePassword).bind(validator),
  userController.changePassword.bind(userController)
);

router.post(
  '/password/reset',
  validator.isBodyValid(validationSchemes.emailSchema).bind(validator),
  userController.resetPassword.bind(userController)
);

router.post(
  '/password/confirm-reset',
  validator.isBodyValid(validationSchemes.resetPassword).bind(validator),
  userController.confirmResetPassword.bind(userController)
);

export default router;
