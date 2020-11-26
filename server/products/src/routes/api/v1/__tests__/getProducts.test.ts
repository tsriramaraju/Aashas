import request from 'supertest';
import { app } from '../../../../app';

describe('Get products test group', () => {
  it('should return empty array if no product is found ', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });

  it('should return list of products', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();

    const res = await request(app)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(3);
  });
});
