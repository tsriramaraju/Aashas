import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Product } from '../../../../models/Products';

describe('Create offer route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .post('/api/v1/products/offers/sdf')
      .send({
        discount: 12,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should update product with valid offer input', async () => {
    const token = await global.adminLogin();
    const product = await global.createProduct();
    const preFetch = await Product.find();
    expect(preFetch[0].inOffer).toBe(false);
    expect(preFetch[0].discount).toBe(undefined);

    const res = await request(app)
      .post(`/api/v1/products/offers/${product.id}`)
      .send({
        discount: 12,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await Product.find();

    expect(products[0].inOffer).toBe(true);
    expect(products[0].discount).toBe(12);
    expect(products[0].version).toBe(1);
    expect(res.body.msg).toBe('Product updated successfully');
  });

  it('should publish 2 events on successful offer input', async () => {
    const token = await global.adminLogin();
    const product = await global.createProduct();
    const preFetch = await Product.find();
    expect(preFetch[0].inOffer).toBe(false);
    expect(preFetch[0].discount).toBe(undefined);

    const res = await request(app)
      .post(`/api/v1/products/offers/${product.id}`)
      .send({
        discount: 12,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await Product.find();

    expect(products[0].inOffer).toBe(true);
    expect(products[0].discount).toBe(12);
    expect(products[0].version).toBe(1);
    expect(res.body.msg).toBe('Product updated successfully');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(3);
  });

  it('should return Resource not found error if no product is found ', async () => {
    const id = Types.ObjectId();
    const token = await global.adminLogin();

    const res = await request(app)
      .post(`/api/v1/products/offers/${id}`)
      .send({
        discount: 12,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Product not found');
  });

  it('should return Bad request if invalid product id is given ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post(`/api/v1/products/offers/1234`)
      .send({
        discount: 12,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Invalid product id');
  });

  it('should return Bad request if offer isn\t between 0-100 ', async () => {
    const id = Types.ObjectId();
    const token = await global.adminLogin();
    const res = await request(app)
      .post(`/api/v1/products/offers/${id}`)
      .send({
        discount: 120,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);

    expect(res.body.msg).toBe('Invalid offer');
  });
  it('should return Bad request if offer isn\t between 0-100 ', async () => {
    const id = Types.ObjectId();
    const token = await global.adminLogin();
    const res = await request(app)
      .post(`/api/v1/products/offers/${id}`)
      .send({
        discount: -120,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Invalid offer');
  });
});
