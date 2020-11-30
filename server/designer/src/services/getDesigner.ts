import { DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { Designer } from '../models/Designer';

export const getDesigner = async (filter: {
  id: Types.ObjectId;
  mode: 'info' | 'blogs' | 'full';
}) => {
  try {
    let data;
    if (filter.mode === 'full')
      data = await Designer.findById(filter.id).lean();
    if (filter.mode === 'blogs')
      data = await Designer.findById(filter.id).select('blogs').lean();
    if (filter.mode === 'info')
      data = await Designer.findById(filter.id).select('-blogs').lean();

    return data;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
