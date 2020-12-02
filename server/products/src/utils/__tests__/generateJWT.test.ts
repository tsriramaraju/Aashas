import { generateJWT, decodeJWT } from '../generateJWT';
import { BadRequestError } from '@aashas/common';
import { payloadData } from '../../dummy Data/payload';

describe('JSON web token  test group', () => {
  it('should create JWT token on valid parameters', () => {
    const token = generateJWT(payloadData);

    expect(typeof token).toBe('string');
  });

  it('should match with JWT payload', () => {
    const token = generateJWT(payloadData);

    const data = decodeJWT(token);

    expect(JSON.stringify(payloadData) == JSON.stringify(data)).toBe(true);
  });

  it('should fail by using expired token', () => {
    expect(() =>
      decodeJWT(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9.eyJwYXlsb2FkIjp7ImlkIjoiNWZhYTM5ZjFiOThkNjcyM2M4ZjAwZDQ1IiwibmFtZSI6ImpvaG4gZG9lIiwiZW1haWwiOiJqb2huQHRlc3QuY29tIn0sImlhdCI6MTYwNDk5MTQ3MywiZXhwIjoxNjA0OTkxNDc0fQ.UVzo2s4H9ObUwHyKZ7UDBeGB6gHWyCnVz4pbds22L2s'
      )
    ).toThrowError(BadRequestError);
  });
});
