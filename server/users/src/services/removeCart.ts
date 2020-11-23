import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const removeCart = async (ids: {
  userId: Types.ObjectId;
  prodId?: Types.ObjectId;
}) => {
  try {
    const user = await User.findById(ids.userId);
    let updatesCart = undefined;
    if (ids.prodId) {
      if (user?.cart) {
        updatesCart = user?.cart?.filter(
          (prod) => prod.toHexString() !== ids.prodId!.toHexString()
        );
      }
    }

    user!.cart = updatesCart;
    return 'Cart items removed successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
