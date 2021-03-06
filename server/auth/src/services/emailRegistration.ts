import { Account } from '../models';
import { hashPassword } from '../utils';
import {
  emailAttrs,
  authType,
  ServerError,
  verification,
} from '@aashas/common';

/**
 * Creates an account document with given details
 * @param name has to be min of 3 characters
 * @param email has to be a valid email
 * @param password  should have min of 6 characters
 */
export const registerByEmail = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const hashPass = await hashPassword(password);

    const data: emailAttrs = {
      authType: authType.email,
      email: email,
      name: name,
      password: hashPass,
      lastLogin: Date.now().toString(),
      emailVerified: verification.pending,
    };

    return await Account.emailBuild(data).save();
  } catch (error) {
    throw new ServerError(error);
  }
};
