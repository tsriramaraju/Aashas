import { DatabaseConnectionError, salesBannerAttrs } from '@aashas/common';
import { Types } from 'mongoose';
import { SalesBanner } from '../models/SalesBanner';

export const removeBanner = (id: Types.ObjectId) => {
  try {
    const banner = SalesBanner.findByIdAndDelete(id);

    return banner;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
