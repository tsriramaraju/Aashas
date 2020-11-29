import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/notAuthorizedError';
import { jwtPayload } from '../interfaces/payLoads';
import { currentUser } from '../services/currentUser';

declare global {
  namespace Express {
    interface Request {
      currentUser?: jwtPayload;
    }
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = currentUser(req);
  if (!user) throw new NotAuthorizedError();

  if (!user.isAdmin) throw new NotAuthorizedError();

  req.currentUser = user;

  next();
};
