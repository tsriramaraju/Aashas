import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const removeFavourites = async (ids: {
  userId: Types.ObjectId;
  prodId?: Types.ObjectId;
}) => {
  try {
    const user = await User.findById(ids.userId);
    let updatesFavourites = undefined;
    if (ids.prodId) {
      if (user?.favourites) {
        updatesFavourites = user?.favourites?.filter(
          (prod) => prod.toHexString() !== ids.prodId!.toHexString()
        );
      }
    }

    user!.favourites = updatesFavourites;
    return 'Favourite removed successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
