import { app } from '../../../../app';
import request from 'supertest';

describe('Get offer products test group', () => {
  it('should return all existing offer products', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const product = await global.createProduct();
    const product1 = await global.createProduct();
    const product2 = await global.createProduct();
    const product3 = await global.createProduct();

    product.inOffer = true;
    product2.inOffer = true;
    product3.inOffer = true;
    product1.inOffer = true;

    await product.save();
    await product1.save();
    await product2.save();
    await product3.save();

    const res = await request(app)
      .get(`/api/v1/products/offers`)

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(4);
  });

  it('should return empty array if no Offer products are found', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const res = await request(app)
      .get(`/api/v1/products/offers`)

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });
});
