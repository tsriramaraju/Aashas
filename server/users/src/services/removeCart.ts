import { DatabaseConnectionError } from '@aashas/common';

import { User } from '../models/Users';

export const removeCart = async (ids: { userId: string; prodId?: string }) => {
  try {
    const user = await User.findById(ids.userId);
    let updatesCart = undefined;
    if (ids.prodId) {
      if (user?.cart) {
        updatesCart = user?.cart?.filter(
          (prod) => prod.toString() !== ids.prodId!.toString()
        );
      }
    }

    user!.cart = updatesCart;
    await user?.save();
    return 'Cart items removed successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
