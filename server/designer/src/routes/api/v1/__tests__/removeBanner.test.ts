import { salesBannerAttrs } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { SalesBanner } from '../../../../models/SalesBanner';

describe('Remove banner test group', () => {
  const banner: salesBannerAttrs = {
    discount: 12,
    img:
      'https://www.theprettydresscompany.com/images/the-pretty-dress-company-end-of-line-dani-bardot-pencil-dress-p280-28563_medium.jpg',
    title: 'title',
    type: 'percentage',
  };

  it('should throw authorization error if non admin access this route', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.userLogin();
    const res = await request(app)
      .delete('/api/v1/designer/banner/:id')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should remove banner successfully', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    await SalesBanner.build(banner).save();
    const bannerDoc = await SalesBanner.build(banner).save();

    const banners = await SalesBanner.find();
    expect(banners!.length).toBe(2);

    const res = await request(app)
      .delete(`/api/v1/designer/banner/${bannerDoc.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postBanners = await SalesBanner.find();
    expect(postBanners!.length).toBe(1);
    expect(res.body.msg).toBe('Banner deleted successfully');
  });

  it('should throw Resource not found error if no banner  is found', async () => {
    await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/designer/banner/${Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Banner not found');
  });
  it('should throw Bad Request error if id is invalid', async () => {
    await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .delete('/api/v1/designer/banner/1221')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Invalid banner id');
  });
});
