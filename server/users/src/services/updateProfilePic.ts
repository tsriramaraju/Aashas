import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { User } from '../models/Users';

export const updateProfilePic = async (data: {
  pic?: string | undefined;
  id: string;
}) => {
  try {
    const user = await User.findById(data.id);
    if (!user) throw new Error('User not found');
    user.image = data.pic;
    await user.save();
    return 'Image updated';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
