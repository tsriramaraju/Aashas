import { DatabaseConnectionError } from '@aashas/common';

import { User } from '../models/Users';

export const getUser = async (id: string, lean: Boolean) => {
  try {
    return lean
      ? await User.findById(id).select('email name image defaultAddress').lean()
      : User.findById(id).lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
