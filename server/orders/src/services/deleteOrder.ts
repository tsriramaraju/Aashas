import { DatabaseConnectionError } from '@aashas/common';
import { Order } from '../models/Orders';

export const deleteOrder = async (orderId: string) => {
  try {
    const orderDoc = await Order.findByIdAndDelete(orderId);
    return orderDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
