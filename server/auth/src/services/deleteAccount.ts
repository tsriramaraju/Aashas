import { Types } from 'mongoose';
import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';
export const deleteAccount = async (id: string) => {
  try {
    if (await Account.findByIdAndDelete(id)) return true;
    return false;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
