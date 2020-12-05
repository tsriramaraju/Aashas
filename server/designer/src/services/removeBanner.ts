import { DatabaseConnectionError, salesBannerAttrs } from '@aashas/common';
import { SalesBanner } from '../models/SalesBanner';

export const removeBanner = (id: string) => {
  try {
    const banner = SalesBanner.findByIdAndDelete(id);

    return banner;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
