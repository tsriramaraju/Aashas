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
    preUser!.orders = [
      Types.ObjectId(),
      Types.ObjectId(),
      Types.ObjectId(),
      Types.ObjectId(),
    ];
    await preUser?.save();
    expect(preUser!.orders!.length).toBe(4);

    const res = await request(app)
      .get('/api/v1/users/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    // expect(res.body.orders.length).toBe(4);
    //  FIXME : populate orders
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
