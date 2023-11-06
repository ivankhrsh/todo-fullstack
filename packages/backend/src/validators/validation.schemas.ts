import Joi from 'joi';

const validationSchemes = {
  todo: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isPrivate: Joi.boolean(),
    isCompleted: Joi.boolean()
  }),
  todoUpdate: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    isPrivate: Joi.boolean(),
    isCompleted: Joi.boolean(),
    userId: Joi.string()
  }),
  authSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  changePassword: Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required()
  }),
  resetPassword: Joi.object({
    password: Joi.string().required(),
    passwordResetCode: Joi.string().required()
  }),
  emailSchema: Joi.object({
    email: Joi.string().email().required()
  })
};

export default validationSchemes;
