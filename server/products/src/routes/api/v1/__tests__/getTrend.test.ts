import { app } from '../../../../app';
import request from 'supertest';

describe('Get trending products test group', () => {
  it('should return all existing trending products', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const product = await global.createProduct();
    const product1 = await global.createProduct();
    const product2 = await global.createProduct();
    const product3 = await global.createProduct();

    product.trending = true;
    product2.trending = true;
    product3.trending = true;
    product1.trending = true;

    await product.save();
    await product1.save();
    await product2.save();
    await product3.save();

    const res = await request(app)
      .get(`/api/v1/products/trends`)

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(4);
  });

  it('should return empty array if no trending products are found', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const res = await request(app)
      .get(`/api/v1/products/trends`)

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });
});
