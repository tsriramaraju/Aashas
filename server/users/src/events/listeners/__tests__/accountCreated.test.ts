import { authType, natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import { Message } from 'node-nats-streaming';
import { User } from '../../../models/Users';
import { AccountCreatedListener } from '../accountCreated';

describe('Account created listener test group', () => {
  const eventData = {
    id: Types.ObjectId(),
    authMode: authType.email,
    name: 'John doe',
    email: 'John@gmail.com',
    mobile: 1234567891,
    profilePic:
      'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4',
  };

  it('should create user account', async () => {
    const listener = new AccountCreatedListener(natsWrapper.client);

    const msg = { ack: () => {} } as Message;

    await listener.onMessage(eventData, msg);

    const user = await User.findOne();

    expect(user?.name).toBe(eventData.name);
  });
});
