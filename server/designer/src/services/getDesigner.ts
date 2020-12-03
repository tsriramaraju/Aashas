import { DatabaseConnectionError } from '@aashas/common';

import { Designer } from '../models/Designer';

export const getDesigner = async (mode: 'info' | 'blogs' | 'full') => {
  const id = await Designer.findOne().select('id').lean();
  try {
    let data;
    if (mode === 'full') data = await Designer.findById(id).lean();
    if (mode === 'blogs')
      data = await Designer.findById(id).select('blogs').lean();
    if (mode === 'info')
      data = await Designer.findById(id).select('-blogs').lean();

    return data;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
