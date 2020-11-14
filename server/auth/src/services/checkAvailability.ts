import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';

/**
 * Checks whether the user already exists or not
 * @param value email or password
 */
export const checkAvailability = async (value: string | number) => {
  try {
    return await Account.findOne(
      typeof value == 'string' ? { email: value } : { mobile: value }
    );
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
