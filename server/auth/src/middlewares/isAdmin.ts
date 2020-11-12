import { decodeJWT } from './../utils/generateJWT';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { Account } from '../models/Accounts';
import { BadRequestError, NotAuthorizedError } from '@aashas/common';

declare global {
  namespace Express {
    interface Request {
      user?: { name: string; id: Types.ObjectId; email?: string };
    }
  }
}
/**
 * Checks whether the incoming request has valid jwt token and also a registered user
 */
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (!req.headers) {
    throw new BadRequestError('Authentication token is not present');
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    throw new BadRequestError('Authentication token is not present');
  }

  // Verify token
  const decoded = decodeJWT(token);
  const user = await Account.findById(decoded!.id).select('-password');

  //make sure user exists
  if (!user) {
    throw new BadRequestError('Authentication token is invalid');
  }

  //make sure that user is not admin
  if (user.isAdmin == 'no') throw new NotAuthorizedError();

  //assign user id and user name to request
  req.user = { id: user.id, name: user.name!, email: user.email };
  next();
};
