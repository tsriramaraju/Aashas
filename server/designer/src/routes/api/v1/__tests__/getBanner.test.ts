import { salesBannerAttrs } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { SalesBanner } from '../../../../models/SalesBanner';

describe('Get banner test group', () => {
  const banner: salesBannerAttrs = {
    discount: 12,
    img:
      'https://www.theprettydresscompany.com/images/the-pretty-dress-company-end-of-line-dani-bardot-pencil-dress-p280-28563_medium.jpg',
    title: 'title',
    type: 'percentage',
  };

  it('should give list of all existing banners', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');

    const banners = await SalesBanner.find();
    expect(banners!.length).toBe(0);

    await SalesBanner.build(banner).save();
    await SalesBanner.build(banner).save();
    await SalesBanner.build(banner).save();
    await SalesBanner.build(banner).save();
    await SalesBanner.build(banner).save();

    const res = await request(app)
      .get('/api/v1/designer/banner')

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(5);
  });

  it('should give empty error if no banners found', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');

    const banners = await SalesBanner.find();
    expect(banners!.length).toBe(0);

    const res = await request(app)
      .get('/api/v1/designer/banner')

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });
});
