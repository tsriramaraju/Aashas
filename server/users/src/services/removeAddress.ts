import { DatabaseConnectionError, ResourceNotFoundError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const removeAddress = async (ids: {
  userId: Types.ObjectId;
  addressId: Types.ObjectId;
}) => {
  try {
    const user = await User.findById(ids.userId);

    if (!user) throw new ResourceNotFoundError('User not found');

    const updatedAddresses = user.addresses?.filter((value) => {
      return;
    });

    return 'Removed address successfully';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
