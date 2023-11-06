import { Request, Response, NextFunction } from 'express';

export const tryCatch =
  (
    handler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<NextFunction | Response | void>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
