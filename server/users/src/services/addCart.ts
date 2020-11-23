import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const addCart = async (ids: {
  userId: Types.ObjectId;
  prodId: Types.ObjectId;
}) => {
  try {
    const user = await User.findById(ids.userId);

    const cartExists = user?.cart?.includes(ids.prodId);

    if (!cartExists) user?.cart?.unshift(ids.prodId);

    return 'Cart items added successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
