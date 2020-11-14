import { Types } from 'mongoose';
import { Reset } from '../../models/Reset';
import { initiateReset } from '../initiateReset';

describe('Initiate Reset service test group', () => {
  it('should create and return Reset Document if email record is not found', async () => {
    const res = await initiateReset('johndoe@test.com');

    expect(res.email).toBe('johndoe@test.com');
    expect(typeof res.uid).toBe('object');
  });

  it('should return existing Reset Document if email record is found', async () => {
    const resetID = Types.ObjectId();
    await Reset.build({
      uid: resetID,
      email: 'johndoe@test.com',
    }).save();

    const res = await initiateReset('johndoe@test.com');

    expect(res.email).toBe('johndoe@test.com');
    expect(JSON.stringify(res.uid)).toBe(JSON.stringify(resetID));
  });
});
