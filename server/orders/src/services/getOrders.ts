import { DatabaseConnectionError, orderAttrs } from '@aashas/common';
import { Order } from '../models/Orders';

export const getOrders = async () => {
  try {
    //  TODO : filter this later
    const orders = await Order.find().lean();
    return orders;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
