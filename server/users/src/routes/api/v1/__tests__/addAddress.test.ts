import { natsWrapper } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { addressData } from '../../../../dummy data/user';
import { User } from '../../../../models/Users';

describe('Add address route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .post('/api/v1/users/address')
      .send({
        ...addressData,
        default: true,
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should add address to user if valid address is given', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.defaultAddress).toBe(undefined);
    expect(preUser!.addresses!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/address')
      .send({
        ...addressData,
        default: false,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    const postUser = await User.findOne({}).lean();
    expect(postUser!.defaultAddress).toBe(undefined);
    expect(postUser!.addresses![0].name).toBe('office 23');

    expect(res.body.msg).toBe('Successfully added');
  });

  it('should add address  and also update default address if default is specified', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.defaultAddress).toBe(undefined);
    expect(preUser!.addresses!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/address')
      .send({
        ...addressData,
        default: true,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    const postUser = await User.findOne({}).lean();
    expect(postUser!.defaultAddress!.name).toBe('office 23');
    expect(postUser!.addresses![0].name).toBe('office 23');

    expect(res.body.msg).toBe('Successfully added');
  });

  it('should consider adding address to address book if default is not mentioned', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.defaultAddress).toBe(undefined);
    expect(preUser!.addresses!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/address')
      .send({
        ...addressData,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    const postUser = await User.findOne({}).lean();
    expect(postUser!.defaultAddress).toBe(undefined);
    expect(postUser!.addresses![0].name).toBe('office 23');

    expect(res.body.msg).toBe('Successfully added');
  });

  it('should enter valid parameters', async () => {
    const token = await global.userLogin();

    const res = await request(app)
      .post('/api/v1/users/address')
      .send({
        ...addressData,
        name: 123,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Entered address name is not String');
  });

  it('should publish event after the process completed successfully', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.defaultAddress).toBe(undefined);
    expect(preUser!.addresses!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/address')
      .send({
        ...addressData,
        default: true,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    const postUser = await User.findOne({}).lean();
    expect(postUser!.defaultAddress!.name).toBe('office 23');
    expect(postUser!.addresses![0].name).toBe('office 23');

    expect(res.body.msg).toBe('Successfully added');
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
