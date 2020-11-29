import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/notAuthorizedError';

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser?.isAdmin) {
    throw new NotAuthorizedError();
  }

  next();
};
