import { Request, Response, NextFunction } from 'express';

import Joi from 'joi';
import { BaseEntity, FindOneOptions } from 'typeorm';
import { tryCatch } from '../utils/tryCatch.utils';
import { AppDataSource } from '../config/database';

export class GenericValidator {
  isBodyValid(schema: Joi.Schema) {
    return tryCatch(async (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details.map((item) => item.message) });
      }

      return next();
    });
  }

  isExist<T extends BaseEntity>(entityClass: new () => T) {
    return tryCatch(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { manager } = AppDataSource;

      const entity = await manager.findOne(entityClass, { where: { id } } as FindOneOptions);

      if (!entity) {
        return res.status(404).json({ message: `${entityClass.name} with id ${id} is not found` });
      }

      return next();
    });
  }
}

const validator = new GenericValidator();
export default validator;
