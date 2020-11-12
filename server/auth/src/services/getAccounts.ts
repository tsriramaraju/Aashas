import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';

/**
 * Retrieves list of all the available  accounts
 */
export const getAccounts = async () => {
  try {
    return await Account.find();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
