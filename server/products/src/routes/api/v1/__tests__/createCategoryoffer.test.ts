import { categories, CategoryOffer, outfit } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import {
  femaleProductData,
  kidsProductData,
  maleProductData,
} from '../../../../dummy data/Product';
import { Product } from '../../../../models/Products';

describe('Create Category offer route test group', () => {
  it('should throw authorization error if non admin access the route', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .post('/api/v1/products/offers-category')
      .send({
        discount: 12,
        inOffer: true,
        outfit: {
          type: categories.kids,
          occasion: {
            birthday: 'Kurtas',
            bridesmaid: 'Kurtas',
          },
        },
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    const products = await Product.find();
    expect(products.length).toBe(0);
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

    expect(preFetchCategories.length).toBe(5);

    preFetchCategories.forEach((product) => {
      expect(product.inOffer).toBe(false);
    });

    const res = await request(app)
      .post('/api/v1/products/offers-category')
      .send({
        discount: 12,
        inOffer: true,
        outfit,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postFetchCategories = await Product.find({ outfit });
    expect(postFetchCategories.length).toBe(5);
    postFetchCategories.forEach((product) => {
      expect(product.inOffer).toBe(true);
      expect(product.discount).toBe(12);
    });
    expect(res.body.msg).toBe('Products updated successfully');
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
      .post('/api/v1/products/offers-category')
      .send({
        discount: 12,
        inOffer: true,
        outfit,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    const postFetchCategories = await Product.find({ outfit });
    expect(postFetchCategories.length).toBe(0);

    expect(res.body.msg).toBe('Product not found');
  });

  it('should return Bad request if invalid offer is given ', async () => {
    const token = await global.adminLogin();
    const outfit = {
      occasion: {
        casual: 'Jac',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };

    const res = await request(app)
      .post('/api/v1/products/offers-category')
      .send({
        discount: 12,
        inOffer: 'true',
        outfit,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid offer Type');
  });

  it('should return Bad request if offer isn\t between 0-100 ', async () => {
    const token = await global.adminLogin();
    const outfit = {
      occasion: {
        casual: 'Jac',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };

    const res = await request(app)
      .post('/api/v1/products/offers-category')
      .send({
        discount: -12,
        inOffer: 'true',
        outfit,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid discount');
  });
  it('should return Bad request if offer isn\t between 0-100 ', async () => {
    const token = await global.adminLogin();
    const outfit = {
      occasion: {
        casual: 'Jac',
        groom: 'Kurta pyjama',
      },
      type: 0,
    };

    const res = await request(app)
      .post('/api/v1/products/offers-category')
      .send({
        discount: 120,
        inOffer: 'true',
        outfit,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid discount');
  });
});
