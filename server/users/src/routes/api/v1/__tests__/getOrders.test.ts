import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Get orders route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .get('/api/v1/users/orders')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should get list of all the orders', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({});
    const order = await global.createOrder(preUser!.id);
    const order1 = await global.createOrder(preUser!.id);
    const order2 = await global.createOrder(preUser!.id);
    const order3 = await global.createOrder(preUser!.id);
    preUser!.orders = [order.id, order1.id, order2.id, order3.id];
    await preUser?.save();
    expect(preUser!.orders!.length).toBe(4);

    const res = await request(app)
      .get('/api/v1/users/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.orders.length).toBe(4);
  });

  it('should return empty array if no orders found', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .get('/api/v1/users/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.orders.length).toBe(0);
  });
});
