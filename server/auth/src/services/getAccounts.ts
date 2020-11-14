import { Types } from 'mongoose';
import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';

/**
 * Retrieves list of all the available  accounts
 */
export const getAccounts = async (id?: Types.ObjectId) => {
  try {
    return await Account.find(id == undefined ? {} : { _id: id });
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
