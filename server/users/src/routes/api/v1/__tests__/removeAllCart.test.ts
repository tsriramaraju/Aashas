import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Remove All Cart items route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users/cart')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should remove all cart items', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({});
    preUser!.cart = [
      Types.ObjectId(),
      Types.ObjectId(),
      Types.ObjectId(),
      Types.ObjectId(),
    ];
    await preUser?.save();
    expect(preUser!.cart!.length).toBe(4);
    const res = await request(app)
      .delete('/api/v1/users/cart')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Cart items removed successfully');
    const postUser = await User.findOne({});
    expect(postUser!.cart!.length).toBe(0);
  });
});
