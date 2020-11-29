import { BadRequestError, jwtPayload, ServerError } from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'process';
import { keys } from '../config/keys';

declare global {
  namespace Express {
    interface Request {
      currentUser?: jwtPayload;
    }
  }
}

export const currentUserTest = (
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
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as
      | string
      | { payload: jwtPayload };
    if (typeof decodedData == 'object') req.currentUser = decodedData.payload;
  } catch (err) {
    throw new ServerError(err);
  }

  next();
};
