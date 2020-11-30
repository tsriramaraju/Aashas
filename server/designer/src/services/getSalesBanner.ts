import { DatabaseConnectionError, salesBannerAttrs } from '@aashas/common';
import { SalesBanner } from '../models/SalesBanner';

export const getBanner = () => {
  try {
    const banner = SalesBanner.find();

    return banner;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
