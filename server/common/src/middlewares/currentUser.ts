import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtPayload } from '../interfaces/payLoads';

declare global {
  namespace Express {
    interface Request {
      currentUser?: jwtPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as jwtPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
