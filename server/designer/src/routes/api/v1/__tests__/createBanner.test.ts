import { salesBannerAttrs } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { SalesBanner } from '../../../../models/SalesBanner';

describe('Create banner test group', () => {
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
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send(banner)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should create banner on successful entry', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send(banner)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.msg).toBe('Banner created successfully');
    const banners = await SalesBanner.find();

    expect(banners![0].discount).toBe(banner.discount);
    expect(banners![0].img).toBe(banner.img);
    expect(banners![0].title).toBe(banner.title);
    expect(banners![0].type).toBe(banner.type);
  });

  it('should throw bad request error on invalid input', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    // const token = global.adminLogin();

    // const res = await request(app)
    //   .post('/api/v1/designer/banner')
    //   .set('Authorization', `Bearer ${token}`)
    //   .send(banner)
    //   .expect('Content-Type', /json/)
    //   .expect(400);

    // expect(res.body.msg).toBe('Invalid input');
    //  TODO : banner validation
  });
});
