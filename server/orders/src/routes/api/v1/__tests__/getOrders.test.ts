import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';

describe('Get list of all orders', () => {
  it('should be accessible only by the admin', async () => {
    const token = await global.adminLogin();
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());

    const res = await request(app)
      .get(`/api/v1/orders/`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should give list of all available orders', async () => {
    const token = await global.userLogin();
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());

    const res = await request(app)
      .get(`/api/v1/orders/`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(7);
  });
  it('should return empty if no orders found', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .get(`/api/v1/orders/`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });
});
