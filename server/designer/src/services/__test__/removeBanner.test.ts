import { Types } from 'mongoose';
import { SalesBanner } from '../../models/SalesBanner';
import { removeBanner } from '../removeBanner';

describe('Remove banner service test group', () => {
  it('should existing banner', async () => {
    const banner = await global.createSalesBanner();
    await global.createSalesBanner();
    await global.createSalesBanner();
    await global.createSalesBanner();
    const response = await SalesBanner.find();
    expect(response.length).toBe(4);
    await removeBanner(banner.id);
    const response1 = await SalesBanner.find();
    expect(response1.length).toBe(3);
  });

  it('should return null if no banner id is found', async () => {
    await global.createSalesBanner();
    await global.createSalesBanner();
    await global.createSalesBanner();
    await global.createSalesBanner();
    const response = await SalesBanner.find();
    expect(response.length).toBe(4);
    await removeBanner(Types.ObjectId());
    const response1 = await SalesBanner.find();
    expect(response1.length).toBe(4);
  });
});
