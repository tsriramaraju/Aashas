import { salesBannerAttrs } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { SalesBanner } from '../../../../models/SalesBanner';
import { removeProperty } from '../../../../utils';

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

  it('should throw bad request error on not entering title', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Please enter title');
  });
  it('should throw bad request error on entering invalid title', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...banner, title: 123 })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Entered title is not String');
  });
  it('should throw bad request error on not entering image', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send(removeProperty(banner, 'img'))
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Please enter img');
  });
  it('should throw bad request error on entering invalid image', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...banner, img: 123 })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Entered img is not String');
  });
  it('should throw bad request error on not entering discount', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send(removeProperty(banner, 'discount'))
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Please enter discount');
  });
  it('should throw bad request error on entering invalid discount', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...banner, discount: '123' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Entered discount is not Number');
  });
  it('should throw bad request error on not entering type', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send(removeProperty(banner, 'type'))
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Please enter type');
  });
  it('should throw bad request error on entering invalid type', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();

    const res = await request(app)
      .post('/api/v1/designer/banner')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...banner, type: '123' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Entered type is not valid discount type');
  });
});
