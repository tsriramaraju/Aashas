import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { orderData } from '../../../../dummyData/orders';
import { Order } from '../../../../models/Orders';

describe('Get list of all orders', () => {
  it('should be accessible only by the admin', async () => {});

  it('should give list of all available orders', async () => {
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());

    const res = await request(app)
      .get(`/api/v1/orders/`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(7);
  });
  it('should return empty if no orders found', async () => {
    const res = await request(app)
      .get(`/api/v1/orders/`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.length).toBe(0);
  });
});
