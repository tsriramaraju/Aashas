import { DatabaseConnectionError } from '@aashas/common';

import { User } from '../models/Users';

export const deleteUser = async (id: string) => {
  try {
    const user = await User.findById(id).populate('orders');

    if (!user) return null;
    if (user.orders === undefined) {
      await user.remove();
      return true;
    }
    // console.log(user.orders);

    let pendingOrder = false;
    user.orders.forEach((order: any) => {
      if (order.deliveryDate === undefined) pendingOrder = true;
    });
    if (!pendingOrder) {
      await user.remove();
      return true;
    }
    return false;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
