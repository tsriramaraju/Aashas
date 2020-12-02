import { getBanner } from '../getSalesBanner';

describe('Get sales banner service test group', () => {
  it('should return list of banners', async () => {
    await global.createSalesBanner();
    await global.createSalesBanner();
    await global.createSalesBanner();
    const res = await getBanner();
    expect(res.length).toBe(3);
  });

  it('should empty array', async () => {
    const res = await getBanner();
    expect(res.length).toBe(0);
  });
});
