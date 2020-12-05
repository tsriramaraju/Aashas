import { jwtPayload } from '@aashas/common/build/interfaces/payLoads';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/notAuthorizedError';

import { currentUserService } from '../services/currentUser';
declare global {
  namespace Express {
    interface Request {
      currentUser?: jwtPayload;
    }
  }
}
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = currentUserService(req);
  if (!user) throw new NotAuthorizedError();

  req.currentUser = user;

  next();
};
