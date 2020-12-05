import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Remove single Favourite items route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users/favourites/hello')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should remove selected item from the Favourite', async () => {
    const token = await global.userLogin();
    const preUser = await User.findOne({});
    const id = Types.ObjectId().toString().toString();
    preUser!.favourites = [
      Types.ObjectId().toString(),
      id,
      Types.ObjectId().toString(),
      Types.ObjectId().toString(),
    ];
    await preUser?.save();
    expect(preUser!.favourites!.length).toBe(4);
    const res = await request(app)
      .delete(`/api/v1/users/favourites/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Favourite removed successfully');
    const postUser = await User.findOne({});
    expect(postUser!.favourites!.length).toBe(3);
  });

  it('should through Bad request error if invalid param is given', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .delete(`/api/v1/users/favourites/21231564`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Invalid product id');
  });

  it("should return success message even if the product isn't found in Favourite ", async () => {
    const token = await global.userLogin();
    const id = Types.ObjectId().toString();
    const res = await request(app)
      .delete(`/api/v1/users/favourites/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Favourite removed successfully');
  });
});
