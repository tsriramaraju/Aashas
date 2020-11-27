import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { Order } from '../models/Orders';

export const deleteOrder = async (orderID: Types.ObjectId) => {
  try {
    const orderDoc = await Order.findByIdAndDelete(orderID);
    return orderDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
