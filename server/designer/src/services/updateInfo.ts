import { DatabaseConnectionError, designerInfoUpdate } from '@aashas/common';
import { Types } from 'mongoose';
import { Designer } from '../models/Designer';

export const updateInfo = (id: Types.ObjectId, data: designerInfoUpdate) => {
  try {
    const designerDoc = Designer.findByIdAndUpdate(id, data);

    return designerDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
