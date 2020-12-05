import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../../models/CustomProducts';
import { CustomProductCreatedListener } from '../customProductCreated';

describe('Custom Product created listener test group', () => {
  it('should create Custom product on receiving Custom product created event', async () => {
    const product = await global.createCustomProduct(
      Types.ObjectId().toString()
    );

    const prodPreFetch = await CustomProduct.find();
    expect(prodPreFetch!.length).toBe(1);

    await prodPreFetch[0].deleteOne();
    const prodPostFetch = await CustomProduct.find();
    expect(prodPostFetch!.length).toBe(0);

    const listener = new CustomProductCreatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        product,
        mode: ['email'],
        version: 1,
        data: {
          title: '',
          message: '',
        },
      },
      msg
    );

    const prodPostFetch1 = await CustomProduct.find();
    expect(prodPostFetch1!.length).toBe(1);
  });
});
