import { User } from '../models/Users';
import { decodeJWT } from './../utils/generateJWT';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotAuthorizedError } from '@aashas/common';

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
    throw new BadRequestError('Invalid headers');
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

  const user = await User.findById(decoded?.id).lean();

  //make sure user exists
  if (!user) {
    throw new BadRequestError('Authentication token is invalid');
  }

  //make sure that user is admin
  if (user.isAdmin === false) throw new NotAuthorizedError();

  next();
};
