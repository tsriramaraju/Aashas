import { natsWrapper, verification } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { customRequestData } from '../../../../dummy Data/customProduct';
import { maleProductData } from '../../../../dummy Data/Product';
import { CustomProduct } from '../../../../models/CustomProducts';
import { Product } from '../../../../models/Products';

describe('Request custom product route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.adminLogin();

    const res = await request(app)
      .post('/api/v1/products/custom')
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it('should Create product if all valid details are provided', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .post('/api/v1/products/custom')
      .send(customRequestData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await CustomProduct.find();
    expect(products.length).toBe(1);
    expect(products![0].status).toBe(verification.pending);
    expect(products![0].version).toBe(0);
    expect(res.body.msg).toBe('Custom Product is requested');
  });
});
