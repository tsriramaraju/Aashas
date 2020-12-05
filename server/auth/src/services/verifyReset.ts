import { hashPassword } from '../utils';
import { Reset, Account } from '../models';
import {
  BadRequestError,
  ResourceNotFoundError,
  ServerError,
} from '@aashas/common';

/**
 * Updates existing user's password by validating the reset link
 * @param id resetId
 * @param pass new password
 * @param email user email
 */
export const verifyReset = async (id: string, pass: string, email: string) => {
  const resetData = await Reset.findOne({ uid: id });

  //Makes sure reset id isn't expired
  if (!resetData)
    throw new ResourceNotFoundError('resetID expired, plz generate again');

  //Makes sure reset id matches with user record
  if (resetData.email != email) throw new BadRequestError('Invalid Reset link');

  try {
    const hash = await hashPassword(pass);
    return await Account.findOneAndUpdate({ email }, { password: hash });
  } catch (error) {
    throw new ServerError(error);
  }
};
