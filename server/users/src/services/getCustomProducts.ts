import { DatabaseConnectionError } from '@aashas/common';
import { User } from '../models/Users';

export const getCustomProducts = async (id: string) => {
  try {
    const products = await User.findById(id).select('customProducts');
    //  TODO : populate later
    return products;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
