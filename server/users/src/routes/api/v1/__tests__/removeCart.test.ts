import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Remove single Cart items route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users/cart/hello')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should remove selected item from the cart', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({});
    const id = Types.ObjectId();
    preUser!.cart = [Types.ObjectId(), id, Types.ObjectId(), Types.ObjectId()];
    await preUser?.save();
    expect(preUser!.cart!.length).toBe(4);
    const res = await request(app)
      .delete(`/api/v1/users/cart/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Cart items removed successfully');
    const postUser = await User.findOne({});
    expect(postUser!.cart!.length).toBe(3);
  });

  it('should through Bad request error if invalid param is given', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .delete(`/api/v1/users/cart/21231564`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Invalid product id');
  });

  it("should return success message even if the product isn't found in cart ", async () => {
    const token = await global.userLogin();
    const id = Types.ObjectId();
    const res = await request(app)
      .delete(`/api/v1/users/cart/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Cart items removed successfully');
  });
});
