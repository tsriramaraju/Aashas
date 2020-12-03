import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { Order } from '../models/Orders';

export const deleteOrder = async (orderId: Types.ObjectId) => {
  try {
    const orderDoc = await Order.findByIdAndDelete(orderId);
    return orderDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
