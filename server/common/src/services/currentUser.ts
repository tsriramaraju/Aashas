import { verify } from 'jsonwebtoken';
import { BadRequestError, jwtPayload, ServerError } from '..';
import { Request } from 'express';

export const currentUser = (req: Request) => {
  try {
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

    const decodedData = verify(token, process.env.JWT_SECRET!) as
      | string
      | { payload: jwtPayload };

    if (typeof decodedData == 'object') return decodedData.payload;
    return null;
  } catch (error) {
    throw new ServerError(error);
  }
};
