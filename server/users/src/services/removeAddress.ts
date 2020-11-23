import {
  address,
  DatabaseConnectionError,
  ResourceNotFoundError,
} from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const removeAddress = async (ids: {
  userId: Types.ObjectId;
  addressId: Types.ObjectId;
}) => {
  try {
    const user = await User.findById(ids.userId);

    if (!user) throw new ResourceNotFoundError('User not found');

    const updatedAddresses = user.addresses?.filter(
      (value) => value._id?.toHexString() !== ids.addressId.toHexString()
    );
    user.addresses = updatedAddresses;

    if (user.defaultAddress) {
      if (
        user.defaultAddress._id!.toHexString() === ids.addressId.toHexString()
      )
        user.defaultAddress = undefined;
    }

    await user.save();

    return 'Removed address successfully';
  } catch (error) {
    console.log(error);
    throw new DatabaseConnectionError(error.message);
  }
};
