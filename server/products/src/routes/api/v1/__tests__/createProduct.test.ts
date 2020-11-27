import { natsWrapper } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { maleProductData } from '../../../../dummy data/Product';
import { Product } from '../../../../models/Products';
import { removeProperty } from '../../../../utils/removeProperty';

describe('Create product route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .post('/api/v1/products')
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
    const token = await global.adminLogin();

    const res = await request(app)
      .post('/api/v1/products')
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await Product.find();
    expect(products.length).toBe(1);
    expect(res.body.msg).toBe('Product added successfully');
  });

  it('should throw Bad request error if title is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'title'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product title');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if description is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'description'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product description');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if size is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'size'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product size');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if price is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'price'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product price');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if color is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'color'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product color');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if quantity is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'quantity'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product quantity');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if keywords is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'keywords'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product keywords');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if outfit is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'outfit'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product outfit');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if gender is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'gender'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product gender');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if images is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'images'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product images');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if isNewProduct is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'isNewProduct'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product isNewProduct');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if designerCollection is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'designerCollection'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product designerCollection');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should throw Bad request error if trending is not provided ', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/products')
      .send(removeProperty(maleProductData, 'trending'))
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(res.body.msg).toBe('Please enter product trending');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
  it('should publish  event if everything is done right', async () => {
    const token = await global.adminLogin();

    const res = await request(app)
      .post('/api/v1/products')
      .send(maleProductData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const products = await Product.find();
    expect(products.length).toBe(1);
    expect(res.body.msg).toBe('Product added successfully');
    expect(natsWrapper.client.publish).toBeCalledTimes(1);
  });
});
