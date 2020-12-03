import { natsWrapper } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { addressData } from '../../../../dummy data/user';
import { User } from '../../../../models/Users';

describe('Remove address route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .delete('/api/v1/users/address/1234564')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should publish event after the process completed successfully', async () => {
    const token = await global.userLogin();

    const user = await User.findOne();

    user!.addresses = [addressData];

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
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
  });

  it('should remove address if valid parameter in provided', async () => {
    const token = await global.userLogin();

    const user = await User.findOne();

    user!.addresses = [addressData];

    await user?.save();

    const id = user?.addresses[0]._id;

    const res = await request(app)
      .delete(`/api/v1/users/address/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const user1 = await User.findOne().lean();
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
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
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
    expect(res.body.msg).toBe('Invalid address ID');
  });
});
