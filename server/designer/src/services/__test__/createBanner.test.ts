import { bannerData } from '../../dummy data/bannerData';
import { SalesBanner } from '../../models/SalesBanner';
import { createBanner } from '../createSalesBanner';

describe('Create banner service test group', () => {
  it('should create banner successfully on entering valid details', async () => {
    const status = await createBanner(bannerData);
    const banner = await SalesBanner.findOne();
    expect(status.toString()).toBe(banner!.toString());
  });
});
