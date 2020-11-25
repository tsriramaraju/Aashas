import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const getUser = async (id: Types.ObjectId, lean: Boolean) => {
  try {
    return lean
      ? await User.findById(id).select('email name image defaultAddress').lean()
      : User.findById(id).lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
