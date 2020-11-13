import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';

/**
 * Retrieves list of all the available  accounts
 */
export const getAccounts = async (id?: Types.ObjectId) => {
  try {
    return await Account.find({ id });
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
