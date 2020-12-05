import { verify } from 'jsonwebtoken';
import { BadRequestError, ServerError } from '..';
import { Request } from 'express';
import { jwtPayload } from '@aashas/common/build/interfaces/payLoads';

export const currentUserService = (req: Request) => {
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
    const decodedData = verify(token, process.env.JWT_SECRET!) as
      | string
      | { payload: jwtPayload };

    if (typeof decodedData == 'object') return decodedData.payload;

    return null;
  } catch (error) {
    throw new ServerError(error);
  }
};
