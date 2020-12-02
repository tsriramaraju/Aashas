import {
  DatabaseConnectionError,
  orderStatusUpdate,
  paymentStatusUpdate,
} from '@aashas/common';
import { Types } from 'mongoose';
import { Order } from '../models/Orders';

export const updateOrder = async (
  orderId: Types.ObjectId,
  update: paymentStatusUpdate | orderStatusUpdate
) => {
  try {
    const orderDoc = await Order.findByIdAndUpdate(orderId, update);
    if (!orderDoc) return null;
    return await Order.findById(orderId);
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
