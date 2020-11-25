import { DatabaseConnectionError, address } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const addAddress = async (data: {
  id: Types.ObjectId;
  address: address;
  defaultAddress?: boolean;
}) => {
  try {
    const user = await User.findById(data.id);
    const addressID = Types.ObjectId();

    let addresses: address[] = [];
    if (user?.addresses) addresses = [...user.addresses];
    addresses.unshift({ _id: addressID, ...data.address });

    await user?.updateOne(
      data.defaultAddress
        ? { addresses, defaultAddress: { _id: addressID, ...data.address } }
        : { addresses }
    );
    return 'Successfully added';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
