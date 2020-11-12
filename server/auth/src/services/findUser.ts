import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';
/**
 * Retrieves user with the given id
 * @param id email or mobile no.
 */
export const findUser = async (id: string | number) => {
  try {
    const user =
      typeof id == 'string'
        ? await Account.findOne({ email: id })
        : await Account.findOne({ mobile: id });

    return user;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
