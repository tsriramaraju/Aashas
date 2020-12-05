import {
  DatabaseConnectionError,
  orderStatusUpdate,
  paymentStatusUpdate,
} from '@aashas/common';

import { Order } from '../models/Orders';

export const updateOrder = async (
  orderId: string,
  update: paymentStatusUpdate | orderStatusUpdate
) => {
  try {
    const orderDoc = await Order.findById(orderId);
    if (!orderDoc) return null;

    Object.keys(update).forEach((key: any) => {
      const newKey = key as keyof object;
      orderDoc[newKey] = update[newKey];
    });

    const res = await orderDoc.save();

    return res;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
