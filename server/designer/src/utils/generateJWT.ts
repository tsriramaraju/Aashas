import { BadRequestError, jwtPayload } from '@aashas/common';
import { sign, verify } from 'jsonwebtoken';
import { keys } from '../config/keys';
/**
 * Returns a valid jwt token
 * @param payload user details
 * @param exp jwt expiry in seconds
 */
export const generateJWT = (payload: jwtPayload, exp: number = 350000) => {
  const token = sign({ payload: payload }, keys.jwtSecret!, {
    expiresIn: exp,
  });
  return token;
};

/**
 * Return user data as payload
 * @param token jwt token
 */
export const decodeJWT = (token: string) => {
  try {
    const decoded = verify(token, keys.jwtSecret!) as
      | string
      | { payload: jwtPayload };

    if (typeof decoded == 'object') return decoded.payload;
  } catch (error) {
    throw new BadRequestError(error);
  }
};
