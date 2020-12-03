import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { maleProductData } from '../../../../dummy Data/Product';
import { Product } from '../../../../models/Products';

describe('Update Product route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .put('/api/v1/products/sdf')
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should update product with valid product input', async () => {
    const token = await global.adminLogin();
    const product = await global.createProduct();
    const preFetch = await Product.find();
    expect(preFetch[0]).not.toBe('males casuals');

    const res = await request(app)
      .put(`/api/v1/products/${product.id}`)
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await Product.find();

    expect(products[0].title).toBe('males casuals');
    expect(products[0].version).toBe(1);
    expect(res.body.msg).toBe('Product updated successfully');
  });
  it('should publish events on valid product input', async () => {
    const token = await global.adminLogin();
    const product = await global.createProduct();
    const preFetch = await Product.find();
    expect(preFetch[0]).not.toBe('males casuals');

    const res = await request(app)
      .put(`/api/v1/products/${product.id}`)
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await Product.find();

    expect(products[0].title).toBe('males casuals');
    expect(products[0].version).toBe(1);
    expect(res.body.msg).toBe('Product updated successfully');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
  });

  it('should return Resource not found error if no product is found ', async () => {
    const id = Types.ObjectId();
    const token = await global.adminLogin();

    const res = await request(app)
      .put(`/api/v1/products/${id}`)
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('Product not found');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should return Bad request if invalid product id is given ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .put(`/api/v1/products/1234}`)
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid product id');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });
});
