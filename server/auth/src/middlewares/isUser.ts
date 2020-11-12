import { decodeJWT } from './../utils/generateJWT';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { Account } from '../models/Accounts';
import { NotAuthorizedError } from '@aashas/common';

/**
 * Checks whether the incoming request has valid jwt token and also an admin
 */
export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

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
    throw new NotAuthorizedError();
  }

  // Verify token
  const decoded = decodeJWT(token);
  const user = await Account.findById(decoded!.id).select('-password');

  //Make sure user exists
  if (!user) {
    throw new NotAuthorizedError();
  }

  //Make sure that user is  admin
  if (user.isAdmin == 'yes') {
    throw new NotAuthorizedError();
  }

  next();
};
