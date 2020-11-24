import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Delete user route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should not delete if user has pending orders', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({});
    preUser!.orders = [Types.ObjectId()];
    await preUser?.save();
    expect(preUser!.orders!.length).toBe(1);

    const res = await request(app)
      .delete('/api/v1/users')

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe(
      "Makes sure the user don't have any pending orders"
    );
  });

  it('should delete successfully if there are no pending orders', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({}).lean();

    expect(preUser!.orders!.length).toBe(0);

    const res = await request(app)
      .delete('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('User deleted successfully');
    const postUser = await User.findOne({}).lean();

    expect(postUser).toBe(null);
  });
  //  TODO : events tests
  it('should publish event after the process completed successfully', async () => {});
});
