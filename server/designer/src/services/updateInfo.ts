import { DatabaseConnectionError, designerInfoUpdate } from '@aashas/common';

import { Designer } from '../models/Designer';

export const updateInfo = (id: string, data: designerInfoUpdate) => {
  try {
    const designerDoc = Designer.findByIdAndUpdate(id, data);

    return designerDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
