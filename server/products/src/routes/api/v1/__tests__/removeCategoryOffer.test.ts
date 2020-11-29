import { categories, natsWrapper } from '@aashas/common';

import request from 'supertest';
import { app } from '../../../../app';
import {
  femaleProductData,
  kidsProductData,
  maleProductData,
} from '../../../../dummyData/Product';
import { Product } from '../../../../models/Products';

describe('Create Category offer route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();
    const outfit = {
      occasion: {
        casual: 'Jackets',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };
    const res = await request(app)
      .delete('/api/v1/products/category/remove')
      .send(outfit)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should update products with valid offer input', async () => {
    const token = await global.adminLogin();
    const outfit = {
      occasion: {
        casual: 'Jackets',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };

    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build(femaleProductData).save();
    await Product.build(kidsProductData).save();

    const preFetch = await Product.find();
    expect(preFetch.length).toBe(7);

    const preFetchCategories = await Product.find({ outfit });

    expect(preFetchCategories.length).toBe(5);

    preFetchCategories.forEach((product) => {
      expect(product.inOffer).toBe(true);
      expect(product.discount).toBe(15);
    });
  });
  it('should publish events valid offer input', async () => {
    const token = await global.adminLogin();
    const outfit = {
      occasion: {
        casual: 'Jackets',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };

    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build({
      inOffer: true,
      discount: 15,
      ...maleProductData,
    }).save();
    await Product.build(femaleProductData).save();
    await Product.build(kidsProductData).save();

    const preFetch = await Product.find();
    expect(preFetch.length).toBe(7);

    const preFetchCategories = await Product.find({ outfit });

    expect(preFetchCategories.length).toBe(5);

    preFetchCategories.forEach((product) => {
      expect(product.inOffer).toBe(true);
      expect(product.discount).toBe(15);
    });

    const res = await request(app)
      .delete('/api/v1/products/category/remove')
      .send(outfit)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postFetchCategories = await Product.find({ outfit });
    expect(postFetchCategories.length).toBe(5);
    postFetchCategories.forEach((product) => {
      expect(product.inOffer).toBe(false);
      expect(product.discount).toBe(0);
    });
    expect(res.body.msg).toBe('Products updated successfully');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(10);
  });

  it('should return Resource not found error if no product is found ', async () => {
    const token = await global.adminLogin();
    const outfit = {
      occasion: {
        casual: 'Jac',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };
    await Product.build(maleProductData).save();
    await Product.build(maleProductData).save();
    await Product.build(maleProductData).save();
    await Product.build(maleProductData).save();
    await Product.build(maleProductData).save();
    await Product.build(femaleProductData).save();
    await Product.build(kidsProductData).save();

    const preFetch = await Product.find();
    expect(preFetch.length).toBe(7);

    const preFetchCategories = await Product.find({ outfit });

    expect(preFetchCategories.length).toBe(0);

    const res = await request(app)
      .delete('/api/v1/products/category/remove')
      .send(outfit)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    const postFetchCategories = await Product.find({ outfit });
    expect(postFetchCategories.length).toBe(0);
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Products not found');
  });
});
