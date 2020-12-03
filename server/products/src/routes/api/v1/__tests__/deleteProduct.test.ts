import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Product } from '../../../../models/Products';

describe('Delete products test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .delete('/api/v1/products/delete/12')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should return 404 error if no id is found ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .delete('/api/v1/products/delete/')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Route not found');
  });

  it('should return Resource not found error if no product is found ', async () => {
    const token = await global.adminLogin();
    const id = Types.ObjectId();
    const res = await request(app)
      .delete(`/api/v1/products/delete/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('No Product found');
  });

  it('should return Bad request if invalid product id is given ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/products/delete/1123154`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Invalid product id');
  });

  it('should delete product successfully', async () => {
    const token = await global.adminLogin();
    await global.createProduct();
    const product = await global.createProduct();
    await global.createProduct();

    const preFetch = await Product.find();

    expect(preFetch.length).toBe(3);

    const res = await request(app)
      .delete(`/api/v1/products/delete/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postFetch = await Product.find();

    expect(postFetch.length).toBe(2);
    expect(res.body.msg).toBe('Product deleted successfully');
  });
  it('should publish event on deleting product successfully', async () => {
    const token = await global.adminLogin();
    await global.createProduct();
    const product = await global.createProduct();
    await global.createProduct();

    const preFetch = await Product.find();

    expect(preFetch.length).toBe(3);

    const res = await request(app)
      .delete(`/api/v1/products/delete/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postFetch = await Product.find();

    expect(postFetch.length).toBe(2);
    expect(res.body.msg).toBe('Product deleted successfully');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
  });
});
