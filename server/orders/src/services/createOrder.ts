import { DatabaseConnectionError, orderAttrs } from '@aashas/common';
import { Order } from '../models/Orders';

export const createOrder = async (order: orderAttrs) => {
  try {
    const orderDoc = await Order.build(order).save();
    return orderDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
