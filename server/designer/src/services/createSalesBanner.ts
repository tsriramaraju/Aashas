import { DatabaseConnectionError, salesBannerAttrs } from '@aashas/common';
import { SalesBanner } from '../models/SalesBanner';

export const createBanner = (data: salesBannerAttrs) => {
  try {
    const banner = SalesBanner.build(data).save();

    return banner;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
