import { natsWrapper } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Update profile picture route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .put('/api/v1/users/image')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should publish event after the process completed successfully', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .put('/api/v1/users/image')
      .send({
        image:
          'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Image updated');

    const user = await User.findOne();

    expect(user?.image).toBe(
      'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4'
    );
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
    expect(user?.version).toBe(1);
  });

  it('should update profile picture with valid input', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .put('/api/v1/users/image')
      .send({
        image:
          'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Image updated');

    const user = await User.findOne();
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
    expect(user?.version).toBe(1);
    expect(user?.image).toBe(
      'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4'
    );
  });

  it('should remove profile pic if no input is given', async () => {
    const token = await global.userLogin();
    const user = await User.findOne();
    user!.image =
      'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4';
    expect(user?.image).toBe(
      'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4'
    );

    await user?.save();

    const res = await request(app)
      .put('/api/v1/users/image')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Image updated');

    const user1 = await User.findOne().lean();
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
    expect(user1?.version).toBe(2);

    expect(user1?.image).toBe(undefined);
  });
});
