import mongoose from 'mongoose';
import { generateJWT, decodeJWT } from '../generateJWT';
import { BadRequestError, jwtPayload, verification } from '@aashas/common';

describe('JSON web token  test group', () => {
  it('should create JWT token on valid parameters', () => {
    const payload: jwtPayload = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'john doe',
      email: 'john@test.com',
      emailVerified: verification.yes,
      mobileVerified: verification.no,
      isAdmin: false,
    };

    const token = generateJWT(payload);

    expect(typeof token).toBe('string');
  });

  it('should match with JWT payload', () => {
    const payload = {
      id: mongoose.Types.ObjectId().toHexString(),
      name: 'john doe',
      email: 'john@test.com',
      emailVerified: verification.yes,
      mobileVerified: verification.no,
      isAdmin: false,
    };

    const token = generateJWT(payload);

    const data = decodeJWT(token);

    expect(JSON.stringify(payload) == JSON.stringify(data)).toBe(true);
  });

  it('should fail by using expired token', () => {
    expect(() =>
      decodeJWT(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9.eyJwYXlsb2FkIjp7ImlkIjoiNWZhYTM5ZjFiOThkNjcyM2M4ZjAwZDQ1IiwibmFtZSI6ImpvaG4gZG9lIiwiZW1haWwiOiJqb2huQHRlc3QuY29tIn0sImlhdCI6MTYwNDk5MTQ3MywiZXhwIjoxNjA0OTkxNDc0fQ.UVzo2s4H9ObUwHyKZ7UDBeGB6gHWyCnVz4pbds22L2s'
      )
    ).toThrowError(BadRequestError);
  });
});
