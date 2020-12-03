import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const addFavourite = async (ids: {
  userId: Types.ObjectId;
  prodId: Types.ObjectId;
}) => {
  try {
    const user = await User.findById(ids.userId);
    if (!user) return null;
    const favExists = user.favourites?.includes(ids.prodId);

    if (!favExists) {
      user.favourites?.unshift(ids.prodId);
      await user.save();
    }

    return 'Favourite added successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
