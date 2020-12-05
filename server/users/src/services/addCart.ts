import { DatabaseConnectionError, UserDoc } from '@aashas/common';
import { User } from '../models/Users';

export const addCart = async (ids: { userId: string; prodId: string }) => {
  try {
    const user = await User.findById(ids.userId);

    if (!user) return null;

    const cartExists = user.cart?.includes(ids.prodId);

    if (!cartExists) {
      user.cart?.unshift(ids.prodId);
      await user.save();
    }

    return 'Cart items added successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
