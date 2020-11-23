import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const updateProfilePic = async (data: {
  pic: string | undefined;
  id: Types.ObjectId;
}) => {
  try {
    await User.findByIdAndUpdate(data.id, { image: data.pic });
    return 'Image updated';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
