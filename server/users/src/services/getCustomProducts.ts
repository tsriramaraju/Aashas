import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const getCustomProducts = async (id: Types.ObjectId) => {
  try {
    const products = await User.findById(id).select('customProducts');
    //  TODO : populate later
    return products;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
