import { authType, verification } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { Account, OTP } from '../../../../models';
import { decodeJWT, generateJWT } from '../../../../utils';
describe('update Contacts route test group', () => {
  it('should update email address from mobile registered user', async () => {
    const user = await Account.mobileBuild({
      authType: authType.mobile,
      lastLogin: Date.now().toString(),
      mobile: 1234567891,
      mobileVerified: verification.yes,
      name: 'john doe',
    }).save();
    expect(user.email).toBe(undefined);
    const token = generateJWT({
      emailVerified: user.emailVerified,
      id: user.id,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    });

    await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        email: 'john@test.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const otpData = await OTP.findOne({ email: 'john@test.com' });
    expect(otpData?.email).toBe('john@test.com');
  });

  it('should update mobile no from email registered user', async () => {
    const user = await Account.emailBuild({
      authType: authType.email,
      lastLogin: Date.now().toString(),
      email: 'john@test.com',
      name: 'john doe',
      emailVerified: verification.pending,
      password: 'this is secret',
    }).save();
    expect(user.mobile).toBe(undefined);
    const token = generateJWT({
      emailVerified: user.emailVerified,
      id: user.id,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    });

    await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        mobile: 1234567891,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const otpData = await OTP.findOne({ mobile: 1234567891 });
    expect(otpData?.mobile).toBe('1234567891');
  });

  it('should generate valid token on updating email address from mobile registered user', async () => {
    const user = await Account.mobileBuild({
      authType: authType.mobile,
      lastLogin: Date.now().toString(),
      mobile: 1234567891,
      mobileVerified: verification.yes,
      name: 'john doe',
    }).save();
    expect(user.email).toBe(undefined);
    const token = generateJWT({
      emailVerified: user.emailVerified,
      id: user.id,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    });

    const res = await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        email: 'john@test.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const otpData = await OTP.findOne({ email: 'john@test.com' });
    expect(otpData?.email).toBe('john@test.com');

    const payload = decodeJWT(res.body);

    expect(payload?.id).toBe(user.id);
  });

  it('should generate valid token on updating mobile no from email registered user', async () => {
    const user = await Account.emailBuild({
      authType: authType.email,
      lastLogin: Date.now().toString(),
      email: 'john@test.com',
      name: 'john doe',
      emailVerified: verification.pending,
      password: 'this is secret',
    }).save();
    expect(user.mobile).toBe(undefined);
    const token = generateJWT({
      emailVerified: user.emailVerified,
      id: user.id,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    });

    const res = await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        mobile: 1234567891,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const otpData = await OTP.findOne({ mobile: 1234567891 });
    expect(otpData?.mobile).toBe('1234567891');

    const payload = decodeJWT(res.body);

    expect(payload?.id).toBe(user.id);
  });

  it('should give bad request error if both parameters are given', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        mobile: 1234567891,
        email: 'john@test.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('invalid request, use only one parameter');
  });
  it('should give bad request error if no parameters are given', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .post('/api/v1/auth/update-contact')

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('invalid request, No valid parameters are found');
  });
  it('should give resource not found error if mobile no. already exists', async () => {
    const user = await Account.mobileBuild({
      authType: authType.mobile,
      lastLogin: Date.now().toString(),
      mobile: 1234567891,
      mobileVerified: verification.yes,
      name: 'john doe',
    }).save();

    const token = generateJWT({
      emailVerified: user.emailVerified,
      id: user.id,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    });

    const res = await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        mobile: 1234567891,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('mobile already exists');
  });
  it('should give resource not found error if email already exists', async () => {
    const user = await Account.emailBuild({
      authType: authType.email,
      lastLogin: Date.now().toString(),
      email: 'john@test.com',
      name: 'john doe',
      emailVerified: verification.pending,
      password: 'this is secret',
    }).save();

    const token = generateJWT({
      emailVerified: user.emailVerified,
      id: user.id,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    });

    const res = await request(app)
      .post('/api/v1/auth/update-contact')
      .send({
        email: 'john@test.com',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('email already exists');
  });

  it('should give Bad request error if route is accessed without token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/update-contact')

      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Authentication token is not present');
  });
  it('should give authorization error if route is accessed by admin', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/auth/update-contact')

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });
});
