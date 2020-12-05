import { DatabaseConnectionError } from '@aashas/common';
import { User } from '../models/Users';

export const getOrder = async (id: string) => {
  try {
    const orders = await User.findById(id).select('orders').populate('orders');

    return orders;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
