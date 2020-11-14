import request from 'supertest';
import { app } from '../../../../app';
import { OTP } from '../../../../models/OTP';
import { natsWrapper } from '@aashas/common';

describe('Mobile signup test groups', () => {
  it('should expect otp and a record in OTP db with valid inputs', async () => {
    const preFetchOTP = await OTP.findOne({ mobile: 1234567891 });

    expect(preFetchOTP).toBe(null);

    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: 'john doe',
        mobile: '1234567891',
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toBe('OTP has been sent to your mobile');
  });

  it('should fail using invalid mobile number input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: 'john doe',
        mobile: '12345891',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should fail using input without mobile number', async () => {
    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: 'john doe',
        mobile: '',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should fail using input without name', async () => {
    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: '',
        mobile: '12345891',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should fail using name less than 3 characters', async () => {
    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: 'jo',
        mobile: '12345891',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should fail is mobile number already exists', async () => {
    await global.register(undefined, 1234567891);

    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: 'john doe',
        mobile: '1234567891',
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Mobile no. already exists');
  });

  it('should publish an GENERATE_OTP event after registering', async () => {
    const preFetchOTP = await OTP.findOne({ mobile: 1234567891 });

    expect(preFetchOTP).toBe(null);

    const res = await request(app)
      .post('/api/v1/auth/new-mobile')
      .send({
        name: 'john doe',
        mobile: '1234567891',
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toBe('OTP has been sent to your mobile');

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
