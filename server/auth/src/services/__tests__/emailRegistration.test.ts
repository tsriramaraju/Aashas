import { ServerError } from '@aashas/common';

import { registerByEmail } from '../emailRegistration';

describe('Email Registration service test group ', () => {
  it('should create record with all the valid details', async () => {
    const result = await registerByEmail(
      'john Doe',
      'john@test.com',
      'this is secret'
    );

    expect(result.name).toBe('john Doe');
  });

  it('should fail creating record with existing details', async () => {
    await registerByEmail('john Doe', 'john@test.com', 'this is secret');

    await expect(
      registerByEmail('john Doe', 'john@test.com', 'this is secret')
    ).rejects.toThrowError(ServerError);
  });
});
