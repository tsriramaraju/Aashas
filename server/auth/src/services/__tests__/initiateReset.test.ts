import { initiateReset } from '../initiateReset';

import { Reset } from '../../models/Reset';
import { v4 } from 'uuid';

describe('Initiate Reset service test group', () => {
  it('should create and return Reset Document if email record is not found', async () => {
    const res = await initiateReset('johndoe@test.com');

    expect(res.email).toBe('johndoe@test.com');
    expect(typeof res.uid).toBe('string');
  });

  it('should return existing Reset Document if email record is found', async () => {
    const resetID = v4();
    await Reset.build({
      uid: resetID,
      email: 'johndoe@test.com',
    }).save();

    const res = await initiateReset('johndoe@test.com');

    expect(res.email).toBe('johndoe@test.com');
    expect(res.uid).toBe(resetID);
  });
});
