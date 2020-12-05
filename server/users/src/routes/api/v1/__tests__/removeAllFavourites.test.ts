import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Remove All Favourite items route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users/favourites')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should remove all Favourite items', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({});
    preUser!.favourites = [
      Types.ObjectId().toString(),
      Types.ObjectId().toString(),
      Types.ObjectId().toString(),
      Types.ObjectId().toString(),
    ];
    await preUser?.save();
    expect(preUser!.favourites!.length).toBe(4);
    const res = await request(app)
      .delete('/api/v1/users/favourites')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Favourite removed successfully');
    const postUser = await User.findOne({});
    expect(postUser!.favourites!.length).toBe(0);
  });
});
