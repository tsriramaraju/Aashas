import { Account } from '../models';
import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
export const deleteAccount = async (id: Types.ObjectId) => {
  try {
    if (await Account.findByIdAndDelete(id)) return true;
    return false;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
