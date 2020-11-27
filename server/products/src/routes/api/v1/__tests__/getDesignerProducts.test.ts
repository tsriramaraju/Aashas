import { app } from '../../../../app';
import request from 'supertest';

describe('Get designer products test group', () => {
  it('should return all existing designer products', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const product = await global.createProduct();
    const product1 = await global.createProduct();
    const product2 = await global.createProduct();
    const product3 = await global.createProduct();

    product.designerCollection = true;
    product2.designerCollection = true;
    product3.designerCollection = true;
    product1.designerCollection = true;

    await product.save();
    await product1.save();
    await product2.save();
    await product3.save();

    const res = await request(app)
      .get(`/api/v1/products/designer`)

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(4);
  });

  it('should return empty array if no designer products are found', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const res = await request(app)
      .get(`/api/v1/products/designer`)

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });
});
