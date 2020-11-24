import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Remove address route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users/address/1234564')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });
  //  TODO : events test
  it('should publish event after the process completed successfully', async () => {});

  it('should remove address if valid parameter in provided', async () => {
    const token = await global.userLogin();

    const user = await User.findOne();

    user!.addresses = [
      {
        name: 'office 23',
        house: 'FF-012, PentHouse',
        location: 'Sparks Ville',
        street: 'NEw hamster Road',
        pin: 530013,
        city: 'vizag',
        state: 'AP',
      },
    ];

    await user?.save();

    const id = user?.addresses[0]._id;

    const res = await request(app)
      .delete(`/api/v1/users/address/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const user1 = await User.findOne().lean();

    expect(res.body.msg).toBe('Removed address successfully');
    expect(user1!.addresses?.length).toBe(0);
  });

  it('should return Bad request error if invalid parameter is given', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .delete(`/api/v1/users/address/12354564`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid address ID');
  });
});
