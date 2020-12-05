import {
  address,
  DatabaseConnectionError,
  ResourceNotFoundError,
} from '@aashas/common';

import { User } from '../models/Users';

export const removeAddress = async (ids: {
  userId: string;
  addressId: string;
}) => {
  try {
    const user = await User.findById(ids.userId);

    if (!user) throw new ResourceNotFoundError('User not found');

    const updatedAddresses = user.addresses?.filter(
      (value) => value._id?.toString() !== ids.addressId.toString()
    );
    user.addresses = updatedAddresses;

    if (
      Object.keys(user.defaultAddress!).length === 0 &&
      user.defaultAddress!.constructor === Object
    ) {
      if (user.defaultAddress!._id!.toString() === ids.addressId.toString())
        user.defaultAddress = undefined;
    }

    await user.save();

    return 'Removed address successfully';
  } catch (error) {
    console.log(error);
    throw new DatabaseConnectionError(error.message);
  }
};
