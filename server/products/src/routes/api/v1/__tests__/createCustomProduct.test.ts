import { natsWrapper, verification } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { customBuildData } from '../../../../dummy Data/customProduct';
import { maleProductData } from '../../../../dummy Data/Product';
import { CustomProduct } from '../../../../models/CustomProducts';
import { Product } from '../../../../models/Products';

describe('Create custom product route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .put('/api/v1/products/custom-create/:id')
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it('should Update product if all valid details are provided', async () => {
    const token = await global.adminLogin();
    const product = await global.createCustomProduct(Types.ObjectId());
    const res = await request(app)
      .put(`/api/v1/products/custom-create/${product.id}`)
      .send(customBuildData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await CustomProduct.find();
    expect(products.length).toBe(1);
    expect(products![0].status).toBe(verification.yes);
    expect(res.body.msg).toBe('Custom Product added successfully');
  });

  it('should publish events on valid product input', async () => {
    const token = await global.adminLogin();
    const product = await global.createCustomProduct(Types.ObjectId());
    const preFetch = await CustomProduct.find();

    const res = await request(app)
      .put(`/api/v1/products/custom-create/${product.id}`)
      .send(customBuildData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await CustomProduct.find();

    expect(products[0].version).toBe(1);
    expect(res.body.msg).toBe('Custom Product added successfully');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
  });

  it('should return Resource not found error if no product is found ', async () => {
    const id = Types.ObjectId();
    const token = await global.adminLogin();

    const res = await request(app)
      .put(`/api/v1/products/custom-create/${id}`)
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('Custom Product not found');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should return Bad request if invalid product id is given ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .put(`/api/v1/products/custom-create/1234}`)
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid product id');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });
});
