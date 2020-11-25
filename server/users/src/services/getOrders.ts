import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const getOrder = async (id: Types.ObjectId) => {
  try {
    const orders = await User.findById(id).select('orders').populate('orders');
    //  TODO : populate later
    return orders;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
