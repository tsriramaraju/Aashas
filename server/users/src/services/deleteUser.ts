import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';

import { User } from '../models/Users';

export const deleteUser = async (id: Types.ObjectId) => {
  try {
    const user = await User.findOne({ id });
    //  TODO : populate orders later

    if (user?.orders?.length !== 0) return false;

    await user?.remove();
    return true;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
