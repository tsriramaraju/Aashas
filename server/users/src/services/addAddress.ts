import { DatabaseConnectionError, address } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const addAddress = async (
  id: Types.ObjectId,
  address: address,
  defaultAddress: boolean
) => {
  try {
    const user = await User.findOne({ id });

    let addresses: address[] = [];
    if (user?.addresses) addresses = [...user.addresses];
    addresses.unshift(address);

    await user?.update(
      defaultAddress ? { addresses, defaultAddress: address } : { addresses }
    );
    return 'Successfully added';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
