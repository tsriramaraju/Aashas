import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Account } from '../../../models';
import { UserDeletedListener } from '../userDeleted';

describe('User deleted even listener test group', () => {
  it('should delete user from the database as expected ', async () => {
    await global.userLogin();
    const preFetch = await Account.find();
    expect(preFetch.length).toBe(1);

    const listener = new UserDeletedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;
    await listener.onMessage(
      {
        id: preFetch![0].id,
        mode: ['email'],
        data: {
          message: '0',
          title: '',
        },
      },
      msg
    );
    const postFetch = await Account.find();
    expect(postFetch.length).toBe(0);
  });
  it('should throw resource not found error on deleting an un found record', async () => {
    const listener = new UserDeletedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;
    await listener.onMessage(
      {
        id: Types.ObjectId(),
        mode: ['email'],
        data: {
          message: '0',
          title: '',
        },
      },
      msg
    );
    const postFetch = await Account.find();
    expect(postFetch.length).toBe(0);
  });
});
