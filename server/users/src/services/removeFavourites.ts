import { DatabaseConnectionError } from '@aashas/common';

import { User } from '../models/Users';

export const removeFavourites = async (ids: {
  userId: string;
  prodId?: string;
}) => {
  try {
    const user = await User.findById(ids.userId);
    let updatesFavourites = undefined;
    if (ids.prodId) {
      if (user?.favourites) {
        updatesFavourites = user?.favourites?.filter(
          (prod) => prod.toString() !== ids.prodId!.toString()
        );
      }
    }

    user!.favourites = updatesFavourites;
    await user?.save();
    return 'Favourite removed successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
